import { ecode } from "./systemCode";

/**
 * 错误码
 */
export interface Code extends Error {
  code: number;
	// sometimes Error return Code in string form
	// NOTE: don't use Error in monitor report even it also work for now
	Error:() => string;
	// Code get error code.
	Code:() => number;
	// Message get code message.
	Message:() => string;
	// Detail get error detail,it may be nil.
	Details:() => any[] | null;
	// Equal for compatible.
	// Deprecated: please use ecode.EqualError.
	Equal: (err: Error) => boolean;
}

/**
 * 新建错误对象
 * @param e 错误码
 * @param message 错误信息
 */
export function New(e: number, message: string): Code {
  let ecode = new Error(message) as Code

  ecode.code = e;

  ecode.Code = function() {
    return this.code;
  }
  ecode.Error = function() {
    return this.name;
  }
  ecode.Message = function() {
    return this.message;
  }
  ecode.Details = function() {
    return null
  }
  ecode.Equal = function(err: Error) {
    return err.name === this.name;
  }

  return ecode
}

/**
 * 注册错误码
 * @param newCode ecode map
 */
export function Register(newCode: Record<string, Code>) {
  Object.assign(ecode, newCode)
}

