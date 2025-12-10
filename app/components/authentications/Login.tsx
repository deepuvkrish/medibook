"use client";
import React from "react";
import styled from "styled-components";
import Checkbox from "../input/Checkbox";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const Login = () => {
  return (
    <StyledWrapper>
      <form className="form md:w-[400px] w-full flex flex-col gap-2.5 dark:bg-[#1f1f1f] bg-gray-200 md:p-[30px] p-5 rounded-[20px]">
        <div className="flex-column">
          <label className="text-gray-600 dark:text-white">Email </label>
        </div>
        <div className="inputForm dark:bg-[#2b2b2b] bg-gray-300 h-[50px] flex items-center pl-2.5 rounded-[10px] border dark:border-[#333] border-gray-400/50">
          <MdOutlineAlternateEmail />
          <input
            type="text"
            className="input ml-2.5 rounded-[10px] w-full h-full dark:bg-[#2b2b2b] bg-gray-300 dark:text-[#f1f1f1] text-gray-700 "
            placeholder="Enter your Email"
          />
        </div>
        <div className="flex-column">
          <label>Password </label>
        </div>
        <div className="inputForm dark:bg-[#2b2b2b] bg-gray-300 h-[50px] flex items-center pl-2.5 rounded-[10px] border dark:border-[#333] border-gray-400/50">
          <IoMdLock />
          <input
            type="password"
            className="input ml-2.5 rounded-[10px] w-full h-full dark:bg-[#2b2b2b] bg-gray-300 dark:text-[#f1f1f1] text-gray-700"
            placeholder="Enter your Password"
          />
        </div>
        <div className="flex-row">
          <Checkbox name="remember me" />
          <span className="span">Forgot password?</span>
        </div>

        <button className="button-submit">Sign In</button>
        <p className="p">
          Don't have an account? <span className="span">Sign Up</span>
        </p>
        <p className="p line">Or With</p>
        <div className="flex-row">
          <button className="btn google">
            <FcGoogle className="text-xl" />
            Google
          </button>
          <button className="btn apple">
            <FaApple className="dark:invert text-xl" />
            Apple
          </button>
        </div>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: #aaa;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    color: #f1f1f1;
    font-weight: 600;
  }

  .inputForm {
    transition: 0.2s ease-in-out;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: #f1f1f1;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #2d79f3;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .p {
    text-align: center;
    color: #f1f1f1;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #333;
    background-color: #2b2b2b;
    color: #f1f1f1;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid #2d79f3;
  }
`;

export default Login;
