import { Link, Form } from 'react-router-dom';
import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaBell,
} from 'react-icons/fa';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Wrapper from '../assets/styledWrappers/Job';
import JobInfo from './JobInfo';
day.extend(advancedFormat);

function Job({
  _id,
  company,
  position,
  jobLocation,
  jobStatus,
  jobType,
  createdAt,
  jobLink,
  followUpDate,
  followUpDone,
}) {
  const date = day(createdAt).format('MMM Do, YYYY');
  const isFollowUpDue =
    followUpDate &&
    !followUpDone &&
    new Date(followUpDate) <= new Date();

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="i">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>

      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />

          {/* ✅ Status row */}
          <div className="status-row">
            <div className={`status ${jobStatus}`}>{jobStatus}</div>
          </div>

          {/* ✅ Follow-Up badge row */}
          {/* {isFollowUpDue && (
            <div className="status followup" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
              <FaBell />
              <span>Follow-Up Due</span>
            </div>
          )} */}
          {isFollowUpDue && (
            <Link
              to="/dashboard/follow-ups"
              className="status followup"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '0.35rem',
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              <FaBell />
              <span>Follow-Up Due</span>
            </Link>
          )}

          {/* ✅ Job link row */}
          {jobLink && (
            <div className="status job-link" style={{ marginTop: '0.5rem' }}>
              <a
                href={jobLink.startsWith('http') ? jobLink : `https://${jobLink}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  height: '100%',
                  width: '100%',
                }}
              >
                <FaExternalLinkAlt />
                Visit Job Posting
              </a>
            </div>
          )}
        </div>

        <footer className="actions">
          <Link to={`../edit-job/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../delete-job/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
}

export default Job;



