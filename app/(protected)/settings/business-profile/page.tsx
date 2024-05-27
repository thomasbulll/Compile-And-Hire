import { ProfileForm } from "@/components/settings/profile-form";
import { Separator } from "@/components/ui/separator";

const TestSettingsPage = async () => {

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                This is how others will see your company on the site.
                </p>
            </div>
            <Separator />
            <ProfileForm />
        </div>
    );
};

export default TestSettingsPage;
