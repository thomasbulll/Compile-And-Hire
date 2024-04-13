import {auth, signOut} from "@/auth";

const SettingsPage = async () => {
    const session = await auth();
    return (
        <main className="main pt-36">
        <h1>
            {JSON.stringify(session)}
        </h1>
        <form
        action={
            async () => {
                "use server";

                await signOut();
            }}>
            <button type="submit">
                Signout
            </button>
        </form>
        </main>
    );
}

export default SettingsPage