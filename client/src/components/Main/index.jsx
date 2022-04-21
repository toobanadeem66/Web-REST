import styles from "./styles.module.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
		
	
	};
	// const token = localStorage.getItem("token");

	// console.log(token.payload.aud);

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>facebook</h1>
				
                
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
};

export default Main;