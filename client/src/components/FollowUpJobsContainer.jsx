import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaBell,
  FaClock,
  FaCheck,
  FaEnvelope,
} from 'react-icons/fa';
import day from 'dayjs';
import { Link, Form, useOutletContext } from 'react-router-dom';
import JobsGridWrapper from '../assets/styledWrappers/JobsContainer';
import JobCardWrapper from '../assets/styledWrappers/FollowUpJob';
import JobInfo from './JobInfo';
import PageBtnContainer from './PageBtnContainer';
import { useState } from 'react';
import apiHandler from '../utils/apiHandler';
import { toast } from 'react-toastify';

function FollowUpJobsContainer({ jobs, currentPage, numOfPages }) {
  const [visibleEmailJobId, setVisibleEmailJobId] = useState(null);
  const [emailDrafts, setEmailDrafts] = useState({});
  const { user } = useOutletContext();

  const handleSnooze = async (jobId) => {
    try {
      await apiHandler.patch(`/jobs/snooze-followup/${jobId}`);
      toast.success('Follow-up snoozed by 3 days');
    } catch (error) {
      toast.error('Failed to snooze follow-up');
    }
  };

  const handleMarkDone = async (jobId) => {
    try {
      await apiHandler.patch(`/jobs/toggle-followup/${jobId}`);
      toast.success('Marked as done');
    } catch (error) {
      toast.error('Failed to mark follow-up as done');
    }
  };

  const toggleEmailEditor = (job) => {
    const emailText = `Hi ${job.contactInfo?.name || 'Recruiter'},\n\nJust following up on my application for the ${job.position} role at ${job.company}. I’m still very interested and would love to hear back.\n\nBest regards,\n${user.name}`;

    setVisibleEmailJobId((prev) => (prev === job._id ? null : job._id));
    setEmailDrafts((prev) => ({
      ...prev,
      [job._id]: emailText,
    }));
  };

  const handleEmailChange = (jobId, value) => {
    setEmailDrafts((prev) => ({
      ...prev,
      [jobId]: value,
    }));
  };

  const handleSendEmail = (jobId, job) => {
    const subject = `Follow-Up: ${job.position} at ${job.company}`;
    const body = emailDrafts[jobId];
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${job.contactInfo?.email}&su=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`
    );
  };

  if (!jobs || jobs.length === 0) {
    return (
      <JobsGridWrapper>
        <p className="no-jobs">No follow-ups due right now.</p>
      </JobsGridWrapper>
    );
  }

  return (
    <JobsGridWrapper>
      <div className="jobs">
        {jobs.map((job) => {
          const {
            _id,
            company,
            position,
            jobLocation,
            jobStatus,
            jobType,
            jobLink,
            followUpDate,
            contactInfo,
          } = job;

          const formattedFollowUp = day(followUpDate).format('MMM D, YYYY');

          return (
            <JobCardWrapper key={_id}>
              <header>
                <div className="main-icon">{company.charAt(0)}</div>
                <div className="info">
                  <h5>{position}</h5>
                  <p>{company}</p>
                </div>
              </header>

              <div className="content">
                <div className="content-center">
                  <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                  <JobInfo icon={<FaCalendarAlt />} text={formattedFollowUp} />
                  <JobInfo icon={<FaBriefcase />} text={jobType} />
                  <div className={`status ${jobStatus}`}>{jobStatus}</div>

                  <div className="status followup">
                    <FaBell style={{ marginRight: '0.5rem' }} />
                    Follow-Up Due
                  </div>
                  {jobLink ? (
                    <a
                      href={jobLink.startsWith('http') ? jobLink : `https://${jobLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="status job-link"
                    >
                      <FaExternalLinkAlt style={{ marginRight: '0.5rem' }} />
                      Visit Posting
                    </a>
                  ) : (
                    <div></div>
                  )}

                  <div className="actions" style={{ justifyContent: 'space-between' }}>
                    <Link to={`../edit-job/${_id}`} className="btn edit-btn">
                      Edit
                    </Link>
                    <Form method="post" action={`../delete-job/${_id}`}>
                      <button type="submit" className="btn delete-btn">
                        Delete
                      </button>
                    </Form>
                  </div>

                  <div className="actions" style={{ justifyContent: 'space-between' }}>
                    <button className="btn btn-snooze" onClick={() => handleSnooze(_id)}>
                      <FaClock /> Snooze
                    </button>
                    <button className="btn btn-done" onClick={() => handleMarkDone(_id)}>
                      <FaCheck /> Done
                    </button>
                  </div>
                </div>

                <div className="centered-action">
                  <button className="btn btn-email" onClick={() => toggleEmailEditor(job)}>
                    <FaEnvelope /> {visibleEmailJobId === _id ? 'Hide Email' : 'Show Email'}
                  </button>
                </div>

                {visibleEmailJobId === _id && (
                  <div className="email-editor" style={{ marginTop: '1rem' }}>
                    <textarea
                      rows={8}
                      value={emailDrafts[_id]}
                      onChange={(e) => handleEmailChange(_id, e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        fontFamily: 'Segoe UI, sans-serif',
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #ccc',
                        borderLeft: '4px solid #4a90e2',
                        resize: 'vertical',
                      }}
                    />
                    <div className="mt-2 flex gap-2" style={{ marginTop: '0.5rem' }}>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => handleSendEmail(_id, job)}
                      >
                        Send via Gmail
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </JobCardWrapper>
          );
        })}
      </div>

      {numOfPages > 1 && (
        <PageBtnContainer currentPage={currentPage} numOfPages={numOfPages} />
      )}
    </JobsGridWrapper>
  );
}

export default FollowUpJobsContainer;

