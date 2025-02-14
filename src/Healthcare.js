// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";

// const Healthcare = () => {
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState(null);
//   const [isOwner, setIsOwner] = useState(null);
//   const [patientID, setPatientID] = useState("");
//   const [diagnosis, setDiagnosis] = useState("");
//   const [treatment, setTreatment] = useState("");
//   const [patientRecords, setPatientRecords] = useState([]);

//   const [providerAddress, setProviderAddress] = useState("");

//   const contractAddress = "0x6e8d6c8318edbeedbba20c12be74a7fee3665b86";

//   const contractABI = [
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "patientID",
//           type: "uint256",
//         },
//         {
//           internalType: "string",
//           name: "patientName",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "diagnosis",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "treatment",
//           type: "string",
//         },
//       ],
//       name: "addRecord",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "provider",
//           type: "address",
//         },
//       ],
//       name: "authorizeProvider",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       stateMutability: "nonpayable",
//       type: "constructor",
//     },
//     {
//       inputs: [],
//       name: "getOwner",
//       outputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "patientID",
//           type: "uint256",
//         },
//       ],
//       name: "getPatientRecords",
//       outputs: [
//         {
//           components: [
//             {
//               internalType: "uint256",
//               name: "recordID",
//               type: "uint256",
//             },
//             {
//               internalType: "string",
//               name: "patientName",
//               type: "string",
//             },
//             {
//               internalType: "string",
//               name: "diagnosis",
//               type: "string",
//             },
//             {
//               internalType: "string",
//               name: "treatment",
//               type: "string",
//             },
//             {
//               internalType: "uint256",
//               name: "timestamp",
//               type: "uint256",
//             },
//           ],
//           internalType: "struct HealthcareRecords.Record[]",
//           name: "",
//           type: "tuple[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//   ];
//   useEffect(() => {
//     const connectWallet = async () => {
//       try {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);

//         await provider.send("eth_requestAccounts", []);
//         const signer = provider.getSigner();
//         setProvider(provider);
//         setSigner(signer);

//         const accountAddress = await signer.getAddress();

//         setAccount(accountAddress);

//         alert(`${accountAddress}`); //
//         console.log(accountAddress);

//         const contract = new ethers.Contract(
//           contractAddress,
//           contractABI,
//           signer
//         );
//         setContract(contract);

//         const ownerAddress = await contract.getOwner();

//         setIsOwner(accountAddress.toLowerCase() === ownerAddress.toLowerCase());
//         alert(`contract owner address is ${contract.getOwner}`); //
//       } catch (error) {
//         console.error("Error connecting to wallet: ", error);
//         alert(`Error connecting ${error}`);
//         alert("Metamask wallet not found!");
//       }
//     };
//     connectWallet();
//   }, []);

//   const fetchPatientRecords = async () => {
//     try {
//       const records = await contract.getPatientRecords(patientID);
//       console.log(records);
//       setPatientRecords(records);
//     } catch (error) {
//       alert("Error fetching patient records", error);
//     }
//   };

//   const addRecord = async () => {
//     try {
//       const tx = await contract.addRecord(
//         patientID,
//         "Alice",
//         diagnosis,
//         treatment
//       );
//       await tx.wait();
//       fetchPatientRecords();
//       await tx.wait();
//       alert(`Provider ${providerAddress} authorized successfully`);
//     } catch (error) {
//       console.error("Error adding records", error);
//     }
//   };

//   const authorizeProvider = async () => {
//     if (isOwner) {
//       try {
//         const tx = await contract.authorizeProvider(providerAddress);
//         await tx.wait();
//         alert(`Provider ${providerAddress} authorized successfully`);
//       } catch (error) {
//         console.error("Only contract owner can authorize different providers");
//       }
//     } else {
//       alert("Only contract owner can call this function");
//     }
//   };

//   return (
//     <div className="container">
//       <h1 className="title">HealthCare Application</h1>
//       {account && <p className="account-info">Connected Account: {account}</p>}
//       {isOwner && <p className="owner-info">You are the contract owner</p>}

//       <div className="form-section">
//         <h2>Fetch Patient Records</h2>
//         <input
//           className="input-field"
//           type="text"
//           placeholder="Enter Patient ID"
//           value={patientID}
//           onChange={(e) => setPatientID(e.target.value)}
//         />
//         <button className="action-button" onClick={fetchPatientRecords}>
//           Fetch Records
//         </button>
//       </div>

//       <div className="form-section">
//         <h2>Add Patient Record</h2>
//         <input
//           className="input-field"
//           type="text"
//           placeholder="Diagnosis"
//           value={diagnosis}
//           onChange={(e) => setDiagnosis(e.target.value)}
//         />
//         <input
//           className="input-field"
//           type="text"
//           placeholder="Treatment"
//           value={treatment}
//           onChange={(e) => setTreatment(e.target.value)}
//         />
//         <button className="action-button" onClick={addRecord}>
//           Add Records
//         </button>
//       </div>
//       <div className="form-section">
//         <h2>Authorize HealthCare Provider</h2>
//         <input
//           className="input-field"
//           type="text"
//           placeholder="Provider Address"
//           value={providerAddress}
//           onChange={(e) => setProviderAddress(e.target.value)}
//         />
//         <button className="action-button" onClick={authorizeProvider}>
//           Authorize Provider
//         </button>
//       </div>

//       <div className="records-section">
//         <h2>Patient Records</h2>
//         {patientRecords.map((record, index) => (
//           <div key={index}>
//             <p>Record ID: {record.recordID.toNumber()}</p>
//             <p>Diagnosis: {record.diagnosis}</p>
//             <p>Treatment: {record.treatment}</p>
//             <p>
//               Timestamp:{" "}
//               {new Date(record.timestamp.toNumber() * 1000).toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Healthcare;

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const Healthcare = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [patientID, setPatientID] = useState("");
  const [patientName, setPatientName] = useState(""); // Added missing patient name state
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [patientRecords, setPatientRecords] = useState([]);
  const [providerAddress, setProviderAddress] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state for better UX

  const contractAddress = "0x6e8d6c8318edbeedbba20c12be74a7fee3665b86";
  const contractABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "patientID",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "patientName",
          type: "string",
        },
        {
          internalType: "string",
          name: "diagnosis",
          type: "string",
        },
        {
          internalType: "string",
          name: "treatment",
          type: "string",
        },
      ],
      name: "addRecord",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "provider",
          type: "address",
        },
      ],
      name: "authorizeProvider",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "getOwner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "patientID",
          type: "uint256",
        },
      ],
      name: "getPatientRecords",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "recordID",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "patientName",
              type: "string",
            },
            {
              internalType: "string",
              name: "diagnosis",
              type: "string",
            },
            {
              internalType: "string",
              name: "treatment",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          internalType: "struct HealthcareRecords.Record[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ]; // Your existing ABI here

  useEffect(() => {
    const connectWallet = async () => {
      try {
        if (!window.ethereum) {
          throw new Error("Metamask wallet not found!");
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        setProvider(provider);
        setSigner(signer);

        const accountAddress = await signer.getAddress();
        setAccount(accountAddress);

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setContract(contract);

        const ownerAddress = await contract.getOwner();
        setIsOwner(accountAddress.toLowerCase() === ownerAddress.toLowerCase());
      } catch (error) {
        console.error("Error connecting to wallet: ", error);
        alert(error.message);
      }
    };

    connectWallet();
  }, []);

  const fetchPatientRecords = async () => {
    if (!contract || !patientID) return;

    try {
      setLoading(true);
      // Convert patientID to BigNumber to avoid invalid string errors
      const id = ethers.BigNumber.from(patientID);
      const records = await contract.getPatientRecords(id);
      setPatientRecords(records);
    } catch (error) {
      console.error("Error fetching patient records:", error);
      alert("Error fetching patient records: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addRecord = async () => {
    if (!contract || !patientID || !patientName || !diagnosis || !treatment) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      // Convert patientID to BigNumber
      const id = ethers.BigNumber.from(patientID);
      const tx = await contract.addRecord(
        id,
        patientName,
        diagnosis,
        treatment
      );
      await tx.wait();

      // Clear form fields
      setDiagnosis("");
      setTreatment("");

      // Refresh records
      await fetchPatientRecords();
      alert("Record added successfully!");
    } catch (error) {
      console.error("Error adding record:", error);
      alert("Error adding record: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const authorizeProvider = async () => {
    if (!isOwner) {
      alert("Only contract owner can authorize providers");
      return;
    }

    if (!ethers.utils.isAddress(providerAddress)) {
      alert("Invalid provider address");
      return;
    }

    try {
      setLoading(true);
      const tx = await contract.authorizeProvider(providerAddress);
      await tx.wait();
      alert(`Provider ${providerAddress} authorized successfully`);
      setProviderAddress("");
    } catch (error) {
      console.error("Error authorizing provider:", error);
      alert("Error authorizing provider: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Healthcare Records Application
      </h1>

      {account && (
        <p className="mb-4 text-gray-600">
          Connected Account: <span className="font-mono">{account}</span>
        </p>
      )}

      {isOwner && (
        <p className="mb-4 text-green-600 font-semibold">
          You are the contract owner
        </p>
      )}

      <div className="space-y-8">
        {/* Add Record Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add Patient Record</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Patient ID"
              value={patientID}
              onChange={(e) => setPatientID(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Treatment"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={addRecord}
              disabled={loading}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? "Processing..." : "Add Record"}
            </button>
          </div>
        </div>

        {/* Fetch Records Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Fetch Patient Records</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Patient ID"
              value={patientID}
              onChange={(e) => setPatientID(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={fetchPatientRecords}
              disabled={loading}
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              {loading ? "Loading..." : "Fetch Records"}
            </button>
          </div>
        </div>

        {/* Authorize Provider Section */}
        {isOwner && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Authorize Healthcare Provider
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Provider Address"
                value={providerAddress}
                onChange={(e) => setProviderAddress(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={authorizeProvider}
                disabled={loading}
                className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
              >
                {loading ? "Processing..." : "Authorize Provider"}
              </button>
            </div>
          </div>
        )}

        {/* Display Records Section */}
        {patientRecords.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Patient Records</h2>
            <div className="space-y-4">
              {patientRecords.map((record, index) => (
                <div key={index} className="border p-4 rounded">
                  <p>Record ID: {record.recordID.toString()}</p>
                  <p>Patient Name: {record.patientName}</p>
                  <p>Diagnosis: {record.diagnosis}</p>
                  <p>Treatment: {record.treatment}</p>
                  <p>
                    Timestamp:{" "}
                    {new Date(
                      record.timestamp.toNumber() * 1000
                    ).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Healthcare;
