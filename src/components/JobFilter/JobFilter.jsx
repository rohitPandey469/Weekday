import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchJobsBasedOnFilter } from "../../actions/jobActions";

const JobFilter = ({ setIsFormFilled, filterParams, setFilterParams }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isFormFilled = Object.values(filterParams).some(
      (value) => value.length > 0
    );
    console.log("Is form filled", isFormFilled);
    setIsFormFilled(isFormFilled);
  }, [filterParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Fetch Jobs based on filter!!!", filterParams);
    dispatch(fetchJobsBasedOnFilter(filterParams, 0)); // Assuming offset value is 0 initially
  };

  return (
    <div>
      <label>
        Job Role:
        <select
          name="jobRole"
          onChange={(e) =>
            setFilterParams((prevParams) => ({
              ...prevParams,
              jobRole: e.target.value == "" ? [] : [e.target.value],
            }))
          }
        >
          <option value="">Select Job Role</option>
          {["frontend", "backend", "UI/UX designer"].map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </label>
      <label>
        Minimum Experience:
        <input
          type="number"
          name="minExp"
          value={filterParams.minExp}
          onChange={handleChange}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={filterParams.location}
          onChange={handleChange}
        />
      </label>
      <label>
        Minimum JD Salary:
        <input
          type="number"
          name="minJdSalary"
          value={filterParams.minJdSalary}
          onChange={handleChange}
        />
      </label>
      <label>
        Remote:
        <input
          type="text"
          name="remote"
          value={filterParams.remote}
          onChange={handleChange}
        />
      </label>
      <label>
        Stack:
        <input
          type="text"
          name="stack"
          value={filterParams.stack}
          onChange={handleChange}
        />
      </label>
      <label>
        Company Name:
        <input
          type="text"
          name="companyName"
          value={filterParams.companyName}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSubmit}>Apply Filter</button>
    </div>
  );
};

export default JobFilter;
