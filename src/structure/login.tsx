'use client'

import { GlobeIcon, SearchIcon, UserIcon } from "@/components/icons";
import { Checkbox, Input, Modal } from "@/components";
import { IBaseModal, IBaseModalWithOpen, IBaseProps } from "@/utils/interfaces";
import { RefObject, useRef, useState } from "react";
import { closeModal, openModal } from "@/utils/modal";

interface ILoginProps extends IBaseProps {
  alerts?: number;
}

interface IModalFormButton extends IBaseProps{
  label: string;
}

function ModalFormButton (props: IModalFormButton) {
  return (
    <button 
      type="submit" 
      className={`uppercase bg-brand/80 text-white w-fit mr-auto py-2 px-4 text-sm rounded-sm hover:brightness-125 duration-300 transition-all ${props.className}`}
    >{props.label}</button>
  )
}

interface IModalFooterButton extends IBaseProps{
  onClick: () => void;
  label: string;
}

function ModalFooterButton (props: IModalFooterButton) {
  return (
    <button 
      className={`text-brand hover:!text-black ${props.className}`}
      onClick={() => props.onClick()}
    >{props.label}
    </button>
  )
}

// Local modal components
// other modals included here as we need to hook into those too
interface ModalProps extends IBaseModal, IBaseModalWithOpen {
  modalSignup: RefObject<HTMLDialogElement | null>;
  modalForgotten: RefObject<HTMLDialogElement | null>;
  modalLogin: RefObject<HTMLDialogElement | null>;
}

function LoginModal({ modalRef, onClose, onOpenModal, modalSignup, modalForgotten }: ModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    keepSignedIn: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Modal
      modalRef={modalRef}
      onClose={onClose}
      title="Sign In"
      size="md"
    >
      <form id="login_form" action="#" method="POST">
        <Input
          id="login_user"
          name="login_user"
          label="Username or Email *"
          placeholder="Your Username or Email *"
          type="text"
          value={formData.username}
          onChange={(value) => handleInputChange('username', value)}
          required
          autoComplete="username"
        />
        <Input
          id="login_pass"
          name="login_pass"
          label="Password *"
          placeholder="Your Password *"
          type="password"
          value={formData.password}
          onChange={(value) => handleInputChange('password', value)}
          required
          autoComplete="current-password"
        />
        <Checkbox
          name="keep_signed_in"
          label="Keep me signed in"
          checked={formData.keepSignedIn}
          onChange={(value) => handleInputChange('keepSignedIn', value)}
        />
        <div className="w-full flex flex-col gap-2 mb-4 ">
          <ModalFormButton label="Sign In" />
        </div>
      </form>
      <div className="flex justify-between">
        <p>Not a member? 
          <ModalFooterButton
            onClick={() => { onClose(); onOpenModal(modalSignup);}}
            label="Sign up"
            className="pl-[1ch]"
          />
        </p>
        <ModalFooterButton
          onClick={() => { onClose(); onOpenModal(modalForgotten);}}
          label="Forgot Password"
        />
      </div>
    </Modal>
  );
}

function ForgottenPasswordModal({ modalRef, onClose, onOpenModal, modalLogin }: ModalProps) {
  const [formData, setFormData] = useState({
    email: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Modal
      modalRef={modalRef}
      onClose={onClose}
      title="Forgotten Password"
      size="md"
    >
      <form id="forgotten_form" action="#" method="POST">
        <Input
          id="forgotten_user"
          name="forgotten_user"
          label="Email Address *"
          placeholder="Your Email Address *"
          type="email"
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          required
        />
        <div className="w-full flex flex-col gap-2 mb-4 ">
          <ModalFormButton label="Get a new Password" />
        </div>
      </form>
      <div className="flex justify-between">
        <ModalFooterButton 
          onClick={() => { onClose(); onOpenModal(modalLogin);}}
          label="Cancel"
        />
      </div>
    </Modal>
  );
}

function SignupModal({ modalRef, onClose, onOpenModal, modalLogin, modalForgotten }: ModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Modal
      modalRef={modalRef}
      onClose={onClose}
      title="Sign Up"
      size="md"
    >
      <form id="signup_form" action="#" method="POST">
        <Input
          id="signup_user"
          name="signup_user"
          label="Username"
          placeholder="Your Username"
          type="text"
          value={formData.username}
          onChange={(value) => handleInputChange('username', value)}
          required
        />
        <Input
          id="signup_email"
          name="signup_email"
          label="Email"
          placeholder="Your Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          required
          autoComplete="off"
        />
        <Input
          id="signup_pass"
          name="signup_pass"
          label="Password"
          placeholder="Your Password"
          type="password"
          value={formData.password}
          onChange={(value) => handleInputChange('password', value)}
          required
          autoComplete="off"
        />
        <div className="w-full flex flex-col gap-2 mb-4 ">
          <ModalFormButton label="Sign Up" />
        </div>
      </form>
      <div className="flex justify-between">
        <p>Already a member?
          <ModalFooterButton
            onClick={() => { onClose(); onOpenModal(modalLogin);}}
            label="Sign In"
            className="pl-[1ch]"
          />
        </p>
        <ModalFooterButton
          onClick={() => { onClose(); onOpenModal(modalForgotten);}}
          label="Forgot Password"
        />
      </div>
    </Modal>
  );
}

export default function Login(props: ILoginProps) {

  const modalLogin = useRef<HTMLDialogElement>(null);
  const modalSignup = useRef<HTMLDialogElement>(null);
  const modalForgotten = useRef<HTMLDialogElement>(null);

  function handleLoginClick() {
    if (modalLogin.current){
      if (modalLogin.current.open){
        modalLogin.current.close();
      }else{
        modalLogin.current.showModal();
      }
    }
  }
  
  return (
    <div className={`gap-8 items-center relative ${props.className}` }>
      <button><SearchIcon className="scale-150"/></button>
      <button className="grid-area-stack items-center">
        {props.alerts && (
          <div className="text-white bg-red-500 rounded-full aspect-square w-6 scale-[60%] z-10 -mt-3 ml-1">{props.alerts}</div>
        )}
        <GlobeIcon className="scale-125"/>
      </button>
      <button
        className="rounded-sm hover:brightness-125 duration-300 transition-all bg-brand text-white font-bold px-4 py-2 flex gap-2"
        onClick={() => handleLoginClick()}
      >
        <UserIcon className="scale-75"/>Login
      </button>
      
      <LoginModal 
        modalRef={modalLogin}
        onClose={() => closeModal(modalLogin)}
        onOpenModal={openModal}
        modalSignup={modalSignup}
        modalForgotten={modalForgotten}
        modalLogin={modalLogin}
      />
      
      <ForgottenPasswordModal 
        modalRef={modalForgotten}
        onClose={() => closeModal(modalForgotten)}
        onOpenModal={openModal}
        modalSignup={modalSignup}
        modalForgotten={modalForgotten}
        modalLogin={modalLogin}
      />
      
      <SignupModal 
        modalRef={modalSignup}
        onClose={() => closeModal(modalSignup)}
        onOpenModal={openModal}
        modalSignup={modalSignup}
        modalForgotten={modalForgotten}
        modalLogin={modalLogin}
      />
    </div>
  );
}