import React from "react";
import styles from "./JobCard.module.css";

const splitTextIntoParagraphs = (text) => {};
const JobCard = ({ job }) => {
  // splitting text into paragraphd for fading text effect
  const desc = job.jobDetailsFromCompany;
  const paragraphs = splitTextIntoParagraphs(desc);
  console.log(paragraphs);
  return (
    <div className={styles.container} key={job.jdUid}>
      <div className={styles.timewrap}>
        <div className={styles.time}>⏳ Posted 12 days ago</div>
      </div>
      <div className={styles.companyblock}>
        <div className={styles.logowrap}>
          <img
            src={job.logoUrl}
            alt={job.companyName}
            className={styles.logo}
          />
        </div>
        <div className={styles.companytitle}>
          <p>{job.companyName}</p>
          <p>{job.jobRole}</p>
          <p>{job.location}</p>
        </div>
      </div>
      <div className={styles.salary}>{`Estimated Salary: ₹${
        job.minJdSalary == null ? 0 : job.minJdSalary
      } - ${job.maxJdSalary} LPA ✅`}</div>
      <div className={styles.content}>
        <h2>About Company:</h2>
        <h3>About us</h3>
        <div className={styles.gradientcontainer}>
          <p className={styles.desc}>{desc.substr(0, 580)}</p>
          {/* <div className={styles.overlay}></div> */}
        </div>
        <a href={job.jdLink}>View job</a>
      </div>
      <div className={styles.expwrap}>
        <h2>Minimum Experince</h2>
        <p>{`${job.minExp == null ? "Fresher" : `${job.minExp} years`}`}</p>
      </div>
      <div className={styles.btnwrap}>
        <button>
          <p>⚡ Easy Apply</p>
        </button>
        <button>
          <div className={styles.referwrap}>
            <img src={job.logoUrl} alt="" />
          </div>
          <div className={styles.referwrap}>
            <img src={job.logoUrl} alt="" />
          </div>
          <p>Unlock referral asks</p>
        </button>
      </div>
    </div>
  );
};

export default JobCard;
