import React from 'react'
import { useState, useRef } from 'react';
import eye from '/eye.png'
import eyecross from '/eyecross.png'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [website, setWebsite] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showpassword, setshowpassword] = useState("false")
    const [passwords, setPasswords] = useState(() => {
        const saved = localStorage.getItem('passwords');
        return saved ? JSON.parse(saved) : [];
    });

    const passwordsRef = useRef(passwords);
    const eyeIcon = showpassword ? eyecross : eye;

    React.useEffect(() => {
        localStorage.setItem('passwords', JSON.stringify(passwords));
    }, [passwords]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!website || !username || !password) return;
        setPasswords([
            ...passwords,
            { website, username, password }
        ]);
        setWebsite('');
        setUsername('');
        setPassword('');
    };

    const [editIndex, setEditIndex] = useState(null);
    const [editWebsite, setEditWebsite] = useState('');
    const [editUsername, setEditUsername] = useState('');
    const [editPassword, setEditPassword] = useState('');

    const handleEdit = (idx) => {
        setEditIndex(idx);
        setEditWebsite(passwords[idx].website);
        setEditUsername(passwords[idx].username);
        setEditPassword(passwords[idx].password);
    };

    const handleEditSave = (idx) => {
        const updated = passwords.map((item, i) =>
            i === idx
                ? { website: editWebsite, username: editUsername, password: editPassword }
                : item
        );
        setPasswords(updated);
        setEditIndex(null);
        toast.success('Password updated!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 py-4">
            <div className="font-bold text-4xl mb-2 cursor-pointer select-none">
                <span className="text-green-500">&lt;</span>
                Pass
                <span className="text-green-500">BIN/&gt;</span>
            </div>
            <div className="text-gray-600 mb-8 text-lg">Your Own Password Manager</div>
            <form
                className="px-8 py-4 min-w-[70vw] max-w-[85vw] w-lg space-y-6 flex flex-col justify-center items-center"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Enter website URL"
                    className="w-full px-5 py-1 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                />
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <input
                        type="text"
                        placeholder="Enter Username"
                        className=" flex-2 px-5 py-1 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <div className="flex-1 relative" ref={passwordsRef}>
                        <input
                            type={showpassword ? "password" : "text"}
                            placeholder="Enter Password"
                            className="w-full px-5 py-1 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <img
                            src={eyeIcon}
                            alt="toggle password"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer opacity-50 hover:opacity-100"
                            onClick={() => setshowpassword(!showpassword)}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="flex justify-center items-center gap-2 px-8 p-1 rounded-full font-bold bg-green-500 text hover:bg-green-400 transition"
                >
                    <lord-icon
                        src="https://cdn.lordicon.com/efxgwrkc.json"
                        trigger="hover">
                    </lord-icon>
                    Save
                </button>
            </form>
            <div className="mt-12 w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8 border border-green-100">
                <div className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-2">
                    Your Passwords
                </div>
                <div className="overflow-x-auto">
                    {passwords.length === 0 ? (
                        <div className="text-gray-500 text-center py-8">No passwords to show</div>
                    ) : (
                        <table className="table-auto w-full text-left border-collapse rounded-md overflow-hidden">
                            <thead>
                                <tr className="bg-green-700 rounded-full overflow-hidden">
                                    <th className="px-6 py-3 text-green-50 border-r border-grey-500">Website</th>
                                    <th className="px-6 py-3 text-green-50 border-r border-grey-500">Username</th>
                                    <th className="px-6 py-3 text-green-50 border-r border-grey-500">Password</th>
                                    <th className="px-6 py-3 text-green-50">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwords.map((item, idx) => (
                                    <tr key={idx} className="bg-green-50 hover:bg-green-50 transition">
                                        {editIndex === idx ? (
                                            <>
                                                <td className="px-6 py-4">
                                                    <input
                                                        className="px-2 py-1 border rounded"
                                                        value={editWebsite}
                                                        onChange={e => setEditWebsite(e.target.value)}
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        className="px-2 py-1 border rounded"
                                                        value={editUsername}
                                                        onChange={e => setEditUsername(e.target.value)}
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        className="px-2 py-1 border rounded"
                                                        value={editPassword}
                                                        onChange={e => setEditPassword(e.target.value)}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 flex gap-2">
                                                    <button
                                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-400"
                                                        onClick={() => handleEditSave(idx)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-200"
                                                        onClick={() => setEditIndex(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-6 py-4 border-r border-grey-500">
                                                    <div className="flex items-center justify-between">
                                                        <span
                                                            onClick={() => open(item.website, '_blank')}>
                                                            {item.website}
                                                        </span>
                                                        <lord-icon
                                                            title="Copy"
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            style={{ width: "20px", height: "20px" }}
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(item.website);
                                                                toast.success('Copied to clipboard!', {
                                                                    position: "top-right",
                                                                    autoClose: 1500,
                                                                    hideProgressBar: true,
                                                                    closeOnClick: true,
                                                                    pauseOnHover: false,
                                                                    draggable: false,
                                                                });
                                                            }}
                                                        >
                                                        </lord-icon>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 border-r border-grey-500">
                                                    <div className="flex items-center justify-between">
                                                        <span>{item.username}</span>
                                                        <lord-icon
                                                            title="Copy"
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            style={{ width: "20px", height: "20px" }}
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(item.username);
                                                                toast.success('Copied to clipboard!', {
                                                                    position: "top-right",
                                                                    autoClose: 1500,
                                                                    hideProgressBar: true,
                                                                    closeOnClick: true,
                                                                    pauseOnHover: false,
                                                                    draggable: false,
                                                                });
                                                            }}
                                                        ></lord-icon>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 border-r border-grey-500">
                                                    <div className="flex items-center justify-between">
                                                        <span>{item.password}</span>
                                                        <lord-icon
                                                            title="Copy"
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            style={{ width: "20px", height: "20px" }}
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(item.password);
                                                                toast.success('Copied to clipboard!', {
                                                                    position: "top-right",
                                                                    autoClose: 1500,
                                                                    hideProgressBar: true,
                                                                    closeOnClick: true,
                                                                    pauseOnHover: false,
                                                                    draggable: false,
                                                                });
                                                            }}
                                                        ></lord-icon>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 flex justify-around gap-2">
                                                    <lord-icon
                                                        title="Edit"
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        style={{ width: "20px", height: "20px" }}
                                                        onClick={() => {
                                                            handleEdit(idx);
                                                        }}
                                                    ></lord-icon>
                                                    <lord-icon
                                                        title="Delete"
                                                        src="https://cdn.lordicon.com/xyfswyxf.json"
                                                        trigger="hover"
                                                        style={{ width: "20px", height: "20px" }}
                                                        onClick={() => {
                                                            setPasswords(passwords.filter((_, i) => i !== idx));
                                                            toast.success('Password deleted!', {
                                                                position: "top-right",
                                                                autoClose: 1500,
                                                                hideProgressBar: true,
                                                                closeOnClick: true,
                                                                pauseOnHover: false,
                                                                draggable: false,
                                                            });
                                                        }}
                                                    ></lord-icon>

                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Manager
