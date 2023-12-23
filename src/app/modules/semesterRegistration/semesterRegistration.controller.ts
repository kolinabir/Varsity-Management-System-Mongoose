import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration is created successfully',
    data: result,
  });
});

const getAllSemesterRegistrations = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationsFromDB(
      req.query,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully fetched all SemesterRegistrations',
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(
      req.params.id,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully fetched single SemesterRegistration',
    data: result,
  });
});

const updateSingleSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.updateSingleSemesterRegistrationFromDB(
      req.params.id,
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated single SemesterRegistration',
    data: result,
  });
});
export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSingleSemesterRegistration,
};
