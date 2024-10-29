import React, { createContext, useContext, useState, useEffect } from "react";
import {
  AuthErrorCodes,
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage"; // Import Firebase Storage
import { firebaseApp } from "./firebase-config";

const FirebaseContext = createContext();

export const useFirebaseAuth = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp); // Initialize Firebase Storage
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [productError, setProductError] = useState(null);

  const login = async (email, password) => {
    // Sign in function
    try {
      setAuthError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (err) {
      // Handle errors
      if (
        err.code === AuthErrorCodes.INVALID_PASSWORD ||
        err.code === AuthErrorCodes.USER_DELETED
      ) {
        setAuthError("The email address or password is incorrect");
      } else {
        setAuthError("An error occurred during sign in");
      }
      throw err;
    }
  };

  const register = async (email, password, role, firstName, lastName, mobilenumber) => {
    // Sign up function
    try {
      setAuthError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(firestore, "users", user.uid), { 
        email: user.email, 
        role: role,
        firstName: firstName,
        lastName: lastName,
        mobilenumber: mobilenumber
      });

      return user;
    } catch (err) {
      // Handle errors
      if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
        setAuthError("The password is too weak.");
      } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
        setAuthError("The email address is already in use.");
      } else {
        setAuthError("An error occurred during sign up");
      }
      throw err;
    }
  };

  const getUserDetails = async (uid) => {
    // Fetch user details
    try {
      const userDoc = await getDoc(doc(firestore, "users", uid));
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        throw new Error("No such user!");
      }
    } catch (err) {
      setAuthError("An error occurred while fetching user details");
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const userDetails = await getUserDetails(user.uid);
          setUserDetails(userDetails);
        } catch (err) {
          console.error("Failed to fetch user details:", err);
        }
      } else {
        setUser(null);
        setUserDetails(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const fetchProducts = async () => {
    // Fetch all products
    try {
      const querySnapshot = await getDocs(collection(firestore, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (err) {
      setProductError("An error occurred while fetching products");
      console.error(err);
    }
  };

  const addProduct = async (product) => {
    // Add a product
    try {
      await addDoc(collection(firestore, "products"), product);
      fetchProducts(); // Refresh product list
    } catch (err) {
      setProductError("An error occurred while adding the product");
      console.error(err);
    }
  };

  const editProduct = async (id, updatedProduct) => {
    // Edit a product
    try {
      const productRef = doc(firestore, "products", id);
      await updateDoc(productRef, updatedProduct);
      fetchProducts(); // Refresh product list
    } catch (err) {
      setProductError("An error occurred while updating the product");
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    // Delete a product
    try {
      const productRef = doc(firestore, "products", id);
      await deleteDoc(productRef);
      fetchProducts(); // Refresh product list
    } catch (err) {
      setProductError("An error occurred while deleting the product");
      console.error(err);
    }
  };

  const uploadImage = async (file) => {
    if (!auth.currentUser) {
      throw new Error("User is not authenticated");
    }
  
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (err) {
      console.error("Error uploading image:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <FirebaseContext.Provider
      value={{
        login,
        register,
        getUserDetails,
        authError,
        user,
        userDetails,
        products,
        addProduct,
        editProduct,
        deleteProduct,
        productError,
        uploadImage, // Add uploadImage to context
        logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
