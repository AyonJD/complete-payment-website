import { db } from "../Config/firebase.config";
import { useState } from "react";
import { toast } from "react-hot-toast";

// Firestore imports
import { doc, setDoc, collection, getDocs, updateDoc, getDoc } from "firebase/firestore";
import "firebase/firestore";

// Add user to firestore
export const addUser = async (uuid, data) => {
    try {
        await setDoc(doc(db, "user", uuid), {
            data
        });
        toast.success('Data submitted successfully!');
    } catch (error) {
        // console.log(error);
    }
}

// Get user from firestore
export const getAllUser = async () => {
    const querySnapshot = await getDocs(collection(db, "user"));

    return new Promise(resolve => {
        const users = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            users.push(data);
        });
        resolve(users);
    }).then(users => {
        const filterUser = users.filter(user => user.data.role !== 'admin');
        return filterUser;
    });
}

// Get user by phone number
export const getUserByPhone = async (phone) => {
    const querySnapshot = await getDocs(collection(db, "user"));

    return new Promise(resolve => {
        const users = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            users.push(data);
        });
        resolve(users);
    }).then(users => {

        const filterUser = users.find(user => phone === user.data.phone);
        return filterUser;
    });
}

// Get user by uudi
export const getUserByUuid = async (uuid) => {
    const querySnapshot = await getDocs(collection(db, "user"));

    return new Promise(resolve => {
        const users = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            users.push(data);
        });
        resolve(users);
    }).then(users => {
        const filterUser = users.find(user => user.data.userUuid === uuid);
        return filterUser;
    });
}

// Update user
export const updateUser = async (uuid, data) => {
    try {
        await updateDoc(doc(db, "user", uuid), {
            data
        });
        toast.success('Data updated successfully!');
    } catch (error) {
        toast.error('Something went wrong!');
        console.log(error);
    }
};

// Get cash out data from firestore by uuid
export const isCashOutDataExist = async (uuid) => {
    const querySnapshot = await getDocs(collection(db, "cashout"));
    return new Promise(resolve => {
        const cashoutData = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            cashoutData.push(data);
        });
        resolve(cashoutData);
    }).then(cashoutData => {
        const filterData = cashoutData.filter(data => data.wrapper[0].userUuid === uuid);
        return filterData;
    });
}

// Add cash out data to firestore
export const addCashOut = async (uuid, data) => {
    try {
        const existingData = await isCashOutDataExist(uuid);

        if (existingData.length === 0) {
            await setDoc(doc(db, "cashout", uuid), {
                wrapper: [data]
            });
            return toast.success('Data submitted successfully!');
        }

        existingData[0].wrapper.push(data);

        await updateDoc(doc(db, "cashout", uuid), {
            wrapper: existingData[0].wrapper
        });
        return toast.success('Data submitted successfully!');

    } catch (error) {
        console.log(error);
    }
}

// Get bank transfer data from firestore by uuid
export const isBankTransferDataExist = async (uuid) => {
    const querySnapshot = await getDocs(collection(db, "banktransfer"));
    return new Promise(resolve => {
        const banktransferData = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            banktransferData.push(data);
        });
        resolve(banktransferData);
    }).then(banktransferData => {
        const filterData = banktransferData.filter(data => data.wrapper[0].userUuid === uuid);
        return filterData;
    });
}

// Add bank transfer data to firestore
export const addBankTransfer = async (uuid, data) => {
    try {
        const existingData = await isBankTransferDataExist(uuid);

        if (existingData.length === 0) {
            await setDoc(doc(db, "banktransfer", uuid), {
                wrapper: [data]
            });
            return toast.success('Data submitted successfully!');
        }

        existingData[0].wrapper.push(data);

        await updateDoc(doc(db, "banktransfer", uuid), {
            wrapper: existingData[0].wrapper
        });
        return toast.success('Data submitted successfully!');

    } catch (error) {
        console.log(error);
    }
}

// Cerate vat Token
export const createVatToken = async (data) => {
    try {
        await setDoc(doc(db, "vatToken", 'd773b18a0c0'), {
            vatToken: data
        });
        toast.success('Data submitted successfully!');
    } catch (error) {
        // console.log(error);
    }
}

// Get vat Token
export const getVatToken = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "vatToken"));
        return new Promise(resolve => {
            const vatToken = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                vatToken.push(data);
            });
            resolve(vatToken);
        }).then(vatToken => {
            return vatToken[0].vatToken;
        });
    } catch (error) {
        console.log(error);
    }
};

// Get deposit data from firestore by uuid
export const isDepositDataExist = async (uuid) => {
    const querySnapshot = await getDocs(collection(db, "deposit"));
    return new Promise(resolve => {
        const depositData = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            depositData.push(data);
        });
        resolve(depositData);
    }).then(depositData => {
        const filterData = depositData.filter(data => data.wrapper[0].userUuid === uuid);
        return filterData;
    });
}

// Add deposit data to firestore
export const addDeposit = async (uuid, data) => {
    try {
        const existingData = await isDepositDataExist(uuid);

        if (existingData.length === 0) {
            await setDoc(doc(db, "deposit", uuid), {
                wrapper: [data]
            });
            return toast.success('Data submitted successfully!');
        }

        existingData[0].wrapper.push(data);

        await updateDoc(doc(db, "deposit", uuid), {
            wrapper: existingData[0].wrapper
        });
        return toast.success('Data submitted successfully!');

    } catch (error) {
        console.log(error);
    }
}

// Find user by account number
export const findUserByAccountNumber = async (accountNumber, bank) => {
    const querySnapshot = await getDocs(collection(db, "user"));

    return new Promise(resolve => {
        const users = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            users.push(data);
        });
        resolve(users);
    }).then(users => {
        const filterUser = users.find(user => user.data.accountNo === accountNumber && user.data.bakn === bank);
        return filterUser;
    });
}