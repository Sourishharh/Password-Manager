import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])
  const [editIndex, setEditIndex] = useState(null);

  const getpasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords);
    setpasswordArray(passwords)

  }


  useEffect(() => {
    getpasswords();
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("icons/eyecross.png")) {
      passwordRef.current.type = "password"
      ref.current.src = "icons/eye.png"
    } else {
      ref.current.src = "icons/eyecross.png"
      passwordRef.current.type = "text"
    }
  }
const savePassword = async () => {
  // validation
  if (
    form.site.length <= 3 ||
    form.username.length <= 3 ||
    form.password.length <= 3
  ) {
    toast.error("All fields must be at least 4 characters", {
      autoClose: 1800,
    });
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      throw new Error("Failed to save password");
    }

    toast.success("Password saved!", { autoClose: 1800 });

    // reload passwords from DB
    await getpasswords();

    // reset form
    setform({ site: "", username: "", password: "" });
    setEditIndex(null);

  } catch (error) {
    toast.error("Error saving password");
    console.error(error);
  }
};




  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!", {
        position: "top-right",
        autoClose: 1800,
      });
    } catch (error) {
      toast.error("Copy failed!");
    }
  };

const deletePassword = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Delete failed");
    }

    toast.success("Password deleted!", { autoClose: 1800 });

    // reload from DB
    await getpasswords();

  } catch (error) {
    toast.error("Error deleting password");
    console.error(error);
  }
};


  const editPassword = (index) => {
    setform(passwordArray[index]); // load values
    setEditIndex(index);           // remember row index
    toast.info("Edit mode enabled", { autoClose: 1800 });
  };




  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50
        bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),
        linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]
        bg-[size:14px_24px]">

        <div className="absolute left-0 right-0 top-0 -z-10 m-auto
          h-[310px] w-[310px] rounded-full bg-green-400
          opacity-20 blur-[100px]">
        </div>
      </div>

      <div className="p-12 md:mycontainer min-h-[88.2vh]">
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-500'> &lt;</span>
          <span>Pass</span><span className='text-green-700'>OP/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='site' id='site' />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='username' id='username' />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' id='password' />
              <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='flex text-white justify-center items-center gap-2 bg-green-500 hover:bg-green-400 rounded-full px-8 py-2 w-fit border border-green-900'>
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover">
            </lord-icon>
            Save</button>
        </div>

        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show</div>}
          {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
            <thead className=' bg-green-800 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className='py-2 border border-white text-center w-32'>
                    <span className="flex items-center justify-center gap-2">
                      <a href={item.site} target="_blank" rel="noreferrer">
                        {item.site}
                      </a>

                      <FontAwesomeIcon
                        icon={faCopy}
                        className="cursor-pointer text-green-700 hover:text-green-900"
                        title="Copy site"
                        onClick={() => copyText(item.site)}
                      />
                    </span>

                  </td>

                  <td className='py-2 border border-white text-center w-32'>
                    <span className="flex items-center justify-center gap-2">
                      <span>{item.username}</span>

                      <FontAwesomeIcon
                        icon={faCopy}
                        className="cursor-pointer text-green-700 hover:text-green-900"
                        title="Copy username"
                        onClick={() => copyText(item.username)}
                      />
                    </span>
                  </td>

                  <td className='py-2 border border-white text-center w-32'>
                    <span className="flex items-center justify-center gap-2">
                      <span>{item.password}</span>

                      <FontAwesomeIcon
                        icon={faCopy}
                        className="cursor-pointer text-green-700 hover:text-green-900"
                        title="Copy password"
                        onClick={() => copyText(item.password)}
                      />
                    </span>
                  </td>

                  <td className='py-2 border border-white text-center w-32'>
                    <span className="flex items-center justify-center gap-3">

                      {/* EDIT */}
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="cursor-pointer text-blue-600 hover:text-blue-800"
                        title="Edit"
                        onClick={() => editPassword(index)}
                      />

                      {/* DELETE */}
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="cursor-pointer text-red-600 hover:text-red-800"
                        title="Delete"
                        onClick={() => deletePassword(item._id)}
                      />

                    </span>
                  </td>

                </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>
      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        theme="colored"
      />
    </>
  );
};

export default Manager;
