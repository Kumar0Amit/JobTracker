import { Form, useActionData, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../assets/styledWrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import apiHandler from '../utils/apiHandler';
import { Link } from 'react-router-dom';


export const action = async ({ request }) => {
  const formData = await request.formData();
  const password = formData.get('password');
  const token = formData.get('token');

  try {
    await apiHandler.post(`/auth/reset-password?token=${token}`, { password });
    toast.success('Password reset successful. You can now log in.');
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Reset failed.');
    return error;
  }
};

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const errors = useActionData();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Reset Password</h4>
        <input type="hidden" name="token" value={token || ''} />
        <FormRow type="password" name="password" label="New Password" />
        {errors?.message && <p style={{ color: '#f98080' }}>{errors.message}</p>}
        <SubmitBtn />
        <p>
          Back to{' '}
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}

export default ResetPassword;
