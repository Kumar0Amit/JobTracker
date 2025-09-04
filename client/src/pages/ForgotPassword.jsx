import { Form, useActionData } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../assets/styledWrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import apiHandler from '../utils/apiHandler';
import { Link } from 'react-router-dom';


export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  try {
    await apiHandler.post('/auth/forgot-password', { email });
    toast.success('If an account exists, a reset link has been sent.');
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong.');
    return error;
  }
};

function ForgotPassword() {
  const errors = useActionData();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Forgot Password</h4>
        <FormRow type="email" name="email" label="Enter your email" />
        {errors?.message && <p style={{ color: '#f98080' }}>{errors.message}</p>}
        <SubmitBtn />
        <p>
          Remembered your password?
          <Link to="/login" className="member-btn">
            Back to Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}

export default ForgotPassword;
