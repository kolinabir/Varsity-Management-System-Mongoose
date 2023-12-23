import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  //check if there any register semester that is already ongoing or upcoming
  const isThereAnyOngoingOrUpcomingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'ONGOING' }, { status: 'UPCOMING' }],
    });
  if (isThereAnyOngoingOrUpcomingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'There is already an ongoing or upcoming semester',
    );
  }

  //if the semester exists
  if (academicSemester) {
    const isAcademicSemesterExists =
      await AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Academic semester does not exists',
      );
    }
  }
  //if the semester registration already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This Semester is already registered',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};

const updateSingleSemesterRegistrationFromDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //if the requested semester exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration does not exists',
    );
  }
  //if the semester registration ended we wont update it
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedSemesterStatus = payload.status;
  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Semester registration is already ended',
    );
  }
  if (
    currentSemesterStatus === 'UPCOMING' &&
    requestedSemesterStatus === 'ENDED'
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You cannot end a semester registration that is not ongoing',
    );
  }
  if (
    currentSemesterStatus === 'ONGOING' &&
    requestedSemesterStatus === 'UPCOMING'
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You cannot make a semester registration upcoming that is already ongoing',
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSingleSemesterRegistrationFromDB,
};
