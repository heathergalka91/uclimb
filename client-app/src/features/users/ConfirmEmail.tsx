import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";
import useQuery from "../../app/common/util/hooks";
import { useStore } from "../../app/stores/store";
import LoginForm from "./LoginForm";

interface Props {}

export default function ConfirmEmail({}: Props) {
  const { modalStore } = useStore();
  const email = useQuery().get("email") as string;
  const token = useQuery().get("token") as string;

  const Status = {
    Verifing: "verifying",
    Failed: "failed",
    Success: "Success",
  };

  const [status, setStatus] = useState(Status.Verifing);

  function handleConfirmEmailResend() {
    agent.Account.resendEmailConfirm(email)
      .then(() => {
        toast.success("Verification email resent - please check your email");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    agent.Account.verifyEmail(token, email)
      .then(() => {
        setStatus(Status.Success);
      })
      .catch(() => setStatus(Status.Failed));
  }, [Status.Failed, Status.Success, token, email]);

  function getBody() {
    switch (status) {
      case Status.Verifing:
        return <p>Verifying...</p>;
      case Status.Failed:
        return (
          <div>
            <p>Verification failed, you can try resending the verify link to your email</p>
            <Button primary onClick={handleConfirmEmailResend} size='huge' content='Resend Email' />
          </div>
        );
      case Status.Success:
        return (
          <div>
            <p>
              Email has been verified - you can now Login
              <Button color='purple' basic onClick={() => modalStore.openModal(<LoginForm />)} size='huge' content='Login' />
            </p>
          </div>
        );
    }
  }

  return (
    <Segment placeholder textAlign='center'>
      <Header icon>
        <Icon name='envelope' />
        Email verification
      </Header>
      <Segment.Inline>{getBody()}</Segment.Inline>
    </Segment>
  );
}
