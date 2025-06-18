const onGoogleSignIn = useCallback(async () => {
  if (buttonRef.current) {
    return;
  }

  buttonRef.current = true;

  try {
    // Sign out any existing session to start fresh
    await GoogleSignin.signOut();

    // Check if Google Play Services are available
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Proceed to sign in
    const userInfo = await GoogleSignin.signIn();
    if (!userInfo) {
      throw new Error('User info is missing');
    }

    // Get tokens for authentication
    const { idToken, accessToken } = await GoogleSignin.getTokens();
    if (!idToken || !accessToken) {
      throw new Error('Failed to get tokens');
    }

    const credential = auth.GoogleAuthProvider.credential(idToken, accessToken);
    await auth().signInWithCredential(credential);

    const token = await auth()?.currentUser?.getIdToken();
    if (!token) {
      throw new Error('Failed to retrieve Firebase ID token');
    }

    // Get FCM token
    const pushToken = await getFCMToken();

    const response = await LoginApi({
      firebase_token: token,
      device_type: Platform.OS,
      push_token: pushToken,
      email: userInfo?.data?.user?.email ?? '',
    });

    if (response?.status === 200) {
      const { data } = response;
      if (data?.payload?.name) {
        dispatch(updateIsOldUser(true));
      } else {
        dispatch(updateIsOldUser(false));
      }

      setTimeout(() => {
        console.log(data.payload);
        dispatch(loginSuccess(data.payload));
      }, 500);

      setTimeout(() => {
        CustomToaster({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          message: 'Welcome! You have successfully Logged in. Let’s get started!',
        });
      }, 1500);

      if (!data?.payload?.name) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'ProfilePicture' }],
        });
      } else if (!data?.payload?.notification_time) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'NotificationPreferences' }],
        });
      } else {
        // @ts-ignore
        navigation.navigate('BottomStack', { screen: 'VerseOfTheDay' });
      }
    }
  } catch (error) {
    console.error('An error occurred during Google Sign-In:', error);
    ErrorHandler(error);
  } finally {
    buttonRef.current = false; // Reset the button state
    AppLoaderRef.current?.stop();
  }
}, [dispatch]);