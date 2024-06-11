import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectors as authSelector } from "@/redux/slices/auth";
import { USER_DEFAULT_PATH, USER_ONBOARDING_PATH } from "@/appconstants";

export default function useAuthNavigate() {
  const router = useRouter();

  const {
    auth: { isAuth = false },
    info: {
      data: { hasCompletedOnboarding = false },
    },
  } = useSelector(authSelector.getAuth);

  useEffect(() => {
    if (isAuth && hasCompletedOnboarding) {
      router.push(USER_DEFAULT_PATH);
    } else if (isAuth && !hasCompletedOnboarding) {
      router.push(USER_ONBOARDING_PATH);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCompletedOnboarding, isAuth]);

  return null;
}
