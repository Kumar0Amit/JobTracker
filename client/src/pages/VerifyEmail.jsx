// src/pages/VerifyEmail.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f9fafb;
  font-family: "Segoe UI", sans-serif;
`;

const Card = styled.div`
  background: #fff;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
  width: 400px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${(props) => (props.$error ? "#dc2626" : "#16a34a")};
`;

const Message = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #374151;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  background: #2563eb;
  color: white;
  text-decoration: none;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #1d4ed8;
  }
`;

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL;

        const res = await fetch(`${API_BASE}/auth/verify-email?` + new URLSearchParams({
          token,
          email,
        }));

        console.log("Verifying:", token, email);

        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully!");
          setTimeout(() => navigate("/login"), 30000); // redirect after 3s
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed. Try again.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    };

    if (token && email) verify();
    else {
      console.log("Verifying:", token, email);

      setStatus("error");
      setMessage("Invalid verification link.");
    }
  }, [token, email, navigate]);

  return (
    <Wrapper>
      <Card>
        {status === "loading" && <Title>⏳ Verifying...</Title>}

        {status === "success" && (
          <>
            <Title>✅ Verified!</Title>
            <Message>{message}</Message>
            <Message>Redirecting you to login...</Message>
          </>
        )}

        {status === "error" && (
          <>
            <Title $error>❌ Error</Title>
            <Message>{message}</Message>
            <Button to="/login">Go to Login</Button>
          </>
        )}
      </Card>
    </Wrapper>
  );
}
