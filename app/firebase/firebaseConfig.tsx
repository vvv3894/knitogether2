// firebase/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB43T7D7RUxKhitdMH02ug5-JrprqIZif0",
  authDomain: "knitogether2.firebaseapp.com",
  projectId: "knitogether2",
  storageBucket: "knitogether2.firebasestorage.app",
  messagingSenderId: "382129385699",
  appId: "1:382129385699:web:30789cbb24c456e2a315d6",
  measurementId: "G-QN17TSG7X0"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase Authentication 모듈 가져오기
export const auth = getAuth(app);
