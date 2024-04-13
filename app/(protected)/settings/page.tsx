import {auth} from "@/auth";

const SettingsPage = async () => {
    const session = await auth();
    return (
        <main className="main">
        <h1>
            {JSON.stringify(session)}
        </h1>
        </main>
    );
}

export default SettingsPage