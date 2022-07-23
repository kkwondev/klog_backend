import { HttpException, InternalServerErrorException } from '@nestjs/common';

export const responseError = (e: Error | any) => {
  if (e.response !== undefined) {
    const { statusCode, message } = e.response;
    throw new HttpException(message || '알수없는 오류 발생', statusCode || 500);
  } else {
    throw new InternalServerErrorException(e);
  }
};
