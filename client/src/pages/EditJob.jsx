import {
  Form,
  redirect,
  useLoaderData,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FormRow,
  FormRowSelect,
  SubmitBtn,
  FormCheckbox,
} from '../components';
import Wrapper from '../assets/styledWrappers/DashboardFormPage';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import apiHandler from '../utils/apiHandler';

export const loader = async ({ params }) => {
  try {
    const { data } = await apiHandler.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect('/dashboard/all-jobs');
  }
};

export const action = (queryClient) => async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await apiHandler.patch(`/jobs/${params.id}`, data);
    toast.success('Job edited successfully');
    queryClient.invalidateQueries(['jobs']);
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

function EditJob() {
  const { job } = useLoaderData();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          {/* Core Fields */}
          <FormRow name="position" defaultValue={job.position} />
          <FormRow name="company" defaultValue={job.company} />
          <FormRow
            labelText="job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />

          {/* Follow-Up Fields */}
          <FormRow
            type="date"
            name="followUpDate"
            labelText="follow-up date"
            defaultValue={job.followUpDate?.slice(0, 10)}
            notRequired
          />
          <FormCheckbox
            name="followUpDone"
            labelText="follow-up completed"
            defaultChecked={job.followUpDone}
          />

          {/* Contact Info Fields */}
          <FormRow
            name="contactName"
            labelText="contact name"
            defaultValue={job.contactInfo?.name}
            notRequired
          />
          <FormRow
            type="email"
            name="contactEmail"
            labelText="contact email"
            defaultValue={job.contactInfo?.email}
            notRequired
          />
          <FormRow
            name="contactPhone"
            labelText="contact phone"
            defaultValue={job.contactInfo?.phone}
            notRequired
          />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
}

export default EditJob;






// import {
//   Form,
//   redirect,
//   useLoaderData,
//   // useParams
// } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { FormRow, FormRowSelect, SubmitBtn } from '../components';
// import Wrapper from '../assets/styledWrappers/DashboardFormPage';
// import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
// import apiHandler from '../utils/apiHandler';

// export const loader = async ({ params }) => {
//   try {
//     const { data } = await apiHandler.get(`/jobs/${params.id}`);
//     return data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//     return redirect('/dashboard/all-jobs');
//   }
// };

// export const action =
//   (queryClient) =>
//   async ({ request, params }) => {
//     const formData = await request.formData();
//     const data = Object.fromEntries(formData);
//     try {
//       await apiHandler.patch(`/jobs/${params.id}`, data);
//       toast.success('Job edited successfully');
//       queryClient.invalidateQueries(['jobs']);
//       return redirect('/dashboard/all-jobs');
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//       return error;
//     }
//   };

// function EditJob() {
//   // const params = useParams(); // in case we needed jobId in the component
//   // console.log(params); //{id: "653ecdc0c8f39065e8fd632c"}
//   const { job } = useLoaderData();

//   return (
//     <Wrapper>
//       <Form method="post" className="form">
//         <h4 className="form-title">edit job</h4>
//         <div className="form-center">
//           <FormRow name="position" defaultValue={job.position} />
//           <FormRow name="company" defaultValue={job.company} />
//           <FormRow
//             labelText="job location"
//             name="jobLocation"
//             defaultValue={job.jobLocation}
//           />

//           <FormRowSelect
//             name="jobStatus"
//             labelText="job status"
//             defaultValue={job.jobStatus}
//             list={Object.values(JOB_STATUS)}
//           />
//           <FormRowSelect
//             name="jobType"
//             labelText="job type"
//             defaultValue={job.jobType}
//             list={Object.values(JOB_TYPE)}
//           />
//           <SubmitBtn formBtn />
//         </div>
//       </Form>
//     </Wrapper>
//   );
// }

// export default EditJob;