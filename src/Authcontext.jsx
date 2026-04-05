import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function checkAuth() {
			fetch('/api/getUser')
				.then(function (response) {
					return response.json()
				})
				.then(function (data) {
					setUser(data)
					setLoading(false)
				})
		}

		checkAuth();
	}, []);

	const onLogout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, onLogout, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext