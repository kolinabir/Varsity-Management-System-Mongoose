import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseService } from './OfferedCourse.service';

const createOfferCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseService.createOfferCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course created successfully',
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferCourse,
};
