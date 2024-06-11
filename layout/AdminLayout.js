import Processing from "@/pages/processing";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/hooks";
import UserLayout from "./UserLayout";
import { USER_DEFAULT_PATH } from "@/appconstants";

const AdminLayout = ({
                         children,
                         title,
                         description,
                         otherSEO,
                         additionalMeta,
                     }) => {
    const router = useRouter();
    const [hasNavigated, setHasNavigated] = useState(false);
    const { isAuth, isRehydrated, userInfo } = useUser();
    const { hasCompletedOnboarding = true } = userInfo;

    useEffect(() => {
        if (isAuth && isRehydrated && userInfo.isLoaded && !hasNavigated) {
            if (userInfo.role !== "admin") {
                router.replace(USER_DEFAULT_PATH);
            } else if (!hasCompletedOnboarding) {
                router.replace("/app/onboarding");
            }
            setHasNavigated(true);
        }
    }, [isAuth, isRehydrated, userInfo.isLoaded, userInfo.role, hasCompletedOnboarding, hasNavigated, router]);

    if (isAuth && isRehydrated && userInfo.role !== "admin" && userInfo.isLoaded) {
        return <Processing color="#000" />;
    }

    return (
        <UserLayout
            title={title}
            description={description}
            otherSEO={otherSEO}
            additionalMeta={additionalMeta}
        >
            {children}
        </UserLayout>
    );
};

export default AdminLayout;
