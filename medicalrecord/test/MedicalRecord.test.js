const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("MedicalRecords", () => {
  let user1, medical, transactionResponse, transactionReceipt;

  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    user1 = accounts[1];
    const Medical = await ethers.getContractFactory("MedicalRecords");
    medical = await Medical.connect(user1).deploy();
  });

  describe("Deployment", () => {
    it("The contract is deployed successfully", async () => {
      expect(await medical.address).to.not.equal(0);
    });
  });

  describe("Add Record", () => {
    beforeEach(async () => {
      transactionResponse = await medical.addRecord(
        "Wastron",
        22,
        "Male",
        "B positive",
        "Dengue",
        "Dengue",
        "Dengue"
      );
      transactionReceipt = await transactionResponse.wait();
    });

    it("Emits a Add Record event", async () => {
      const events = await medical.queryFilter(
        medical.filters.MedicalRecords__AddRecord()
      );
      expect(events.length).to.equal(1);
      const args = events[0]?.args;
      expect(args).to.not.equal(undefined);
      

      expect(args.timestamp).to.not.equal(0);
      expect(args.name).to.equal("Wastron");
      expect(args.age).to.equal(22);
      expect(args.gender).to.equal("Male");
      expect(args.bloodType).to.equal("B positive");
      expect(args.allergies).to.equal("Dengue");
      expect(args.diagnosis).to.equal("Dengue");
      expect(args.treatment).to.equal("Dengue");
    });

    it("The getRecords function is working", async () => {
      const [
        timestamp,
        name,
        age,
        gender,
        bloodType,
        allergies,
        diagnosis,
        treatment,
      ] = await medical.getRecord(await medical.getRecordId());
      expect(await medical.getRecordId()).to.equal(1);
      expect(timestamp).to.not.equal(0);
      expect(name).to.equal("Wastron");
      expect(age).to.equal(22);
      expect(gender).to.equal("Male");
      expect(bloodType).to.equal("B positive");
      expect(allergies).to.equal("Dengue");
      expect(diagnosis).to.equal("Dengue");
      expect(treatment).to.equal("Dengue");
    });
  });

  describe("The delete function is working", () => {
    beforeEach(async () => {
      transactionResponse = await medical.addRecord(
        "Wastron",
        22,
        "Male",
        "B positive",
        "Dengue",
        "Dengue",
        "Dengue"
      );
      transactionReceipt = await transactionResponse.wait();
      transactionResponse = await medical.deleteRecord(1);
      transactionReceipt = await transactionResponse.wait();
    });

    it("The record is deleted", async () => {
      expect(await medical.getDeleted(1)).to.be.equal(true);
    });

    it("Emits a delete event", async () => {
      const events = await medical.queryFilter(
        medical.filters.MedicalRecords__DeleteRecord()
      );
      expect(events.length).to.equal(1);
      const args = events[0]?.args;
      expect(args).to.not.equal(undefined);
     

      expect(args.timestamp).to.not.equal(0);
      expect(args.name).to.equal("Wastron");
      expect(args.age).to.equal(22);
      expect(args.gender).to.equal("Male");
      expect(args.bloodType).to.equal("B positive");
      expect(args.allergies).to.equal("Dengue");
      expect(args.diagnosis).to.equal("Dengue");
      expect(args.treatment).to.equal("Dengue");
    });
  });
});
