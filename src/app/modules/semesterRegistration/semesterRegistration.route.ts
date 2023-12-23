import express from 'express';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);
router.get('/', SemesterRegistrationControllers.getAllSemesterRegistrations);
router.get('/:', SemesterRegistrationControllers.getSingleSemesterRegistration);

// router.delete('/:facultyId', FacultyControllers.deleteFaculty);

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSingleSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
