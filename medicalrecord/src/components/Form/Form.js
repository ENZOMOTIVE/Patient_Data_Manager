import React, { useState } from "react";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { submitRecord } from "../../store/interactions";

const Form = () => {
  const provider = useSelector((state) => state.provider.connection);
  const medical = useSelector((state) => state.medical.contract);
  const account = useSelector((state) => state.provider.account);
  const dispatch = useDispatch();

  // Declare submitHandler as an async function
  const submitHandler = async (e) => {
    e.preventDefault();
    await submitRecord(
      name,
      age,
      gender,
      bloodType,
      allergies,
      diagnosis,
      treatment,
      provider,
      medical,
      dispatch
    );
    console.log(name);
    console.log(age);
    console.log(gender);
    console.log(bloodType);
    console.log(allergies);
    console.log(diagnosis);
    console.log(treatment);
  };

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");

  return (
    <div className="login-container">
      {account ? (
        <form onSubmit={submitHandler}>
          <h1>Patient Details</h1>

          <label htmlFor="name">Patient Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Aman Dhattarwal"
          />

          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            required
            placeholder="29"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            required
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="bloodType">Blood type:</label>
          <input
            type="text"
            id="bloodType"
            name="bloodType"
            required
            placeholder="B positive"
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
          />
          <label htmlFor="allergies">Allergies:</label>
          <input
            type="text"
            id="allergies"
            name="allergies"
            required
            placeholder="Pollen allergy"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
          <label htmlFor="diagnosis">Diagnosis:</label>
          <input
            type="text"
            id="diagnosis"
            name="diagnosis"
            required
            placeholder="Osteoporosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
          <label htmlFor="treatment">Treatment:</label>
          <input
            type="text"
            id="treatment"
            name="treatment"
            required
            placeholder="Surgery"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
          />

          <input type="submit" value="Submit" />
        </form>
      ) : (
        <h1>Connect the account</h1>
      )}
    </div>
  );
};

export default Form;
