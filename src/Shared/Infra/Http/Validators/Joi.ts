import IObject from "@Shared/@Types/IObject";
import EnumToArray from "@Shared/Helpers/EnumToArray";
import { Joi } from "celebrate";
import { StringSchema } from "joi";

const enumToArray = new EnumToArray();

export const OptionalUUID = Joi.string().uuid();
export const RequiredUUID = OptionalUUID.required();

export const OptionalAnyString = Joi.string().lowercase();
export const RequiredAnyString = OptionalAnyString.required();

export const OptionalNumber = Joi.number();
export const RequiredNumber = OptionalNumber.required();

export const OptinalPage = Joi.number();
export const RequiredPage = OptinalPage.required();

export const OptinalLimit = Joi.number();
export const RequiredLimit = OptinalLimit.required();

export const OptionalEnum = (enumme: IObject): StringSchema =>
  Joi.string().equal(...enumToArray.execute(enumme));
export const RequiredEnum = (enumme: IObject): StringSchema =>
  OptionalEnum(enumme).required();
