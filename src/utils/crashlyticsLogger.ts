import crashlytics from '@react-native-firebase/crashlytics';

type LogErrorParams = {
  screenName?: string;
  functionName?: string;
  error: unknown;
  extraInfo?: Record<string, any>;
};

export const logAppError = ({
  screenName,
  functionName,
  error,
  extraInfo = {},
}: LogErrorParams) => {
  console.log('\n\n 🚀 ~ logAppError ~ error:', error);

  try {
    const time = new Date().toISOString();

    if (screenName) crashlytics().setAttribute('screen_name', screenName);
    if (functionName) crashlytics().setAttribute('function_name', functionName);
    crashlytics().setAttribute('error_time', time);

    Object.entries(extraInfo).forEach(([key, value]) => {
      crashlytics().setAttribute(key, String(value));
    });

    crashlytics().log(
      `Error in ${screenName || 'UnknownScreen'} -> ${
        functionName || 'UnknownFunction'
      } at ${time}`,
    );

    if (error instanceof Error) {
      crashlytics().recordError(error);
    } else {
      crashlytics().recordError(new Error(JSON.stringify(error)));
    }
  } catch (e) {
    console.log('Crashlytics logging failed', e);
  }
};

type ApiErrorParams = {
  apiName?: string;
  methodName?: string;
  error: unknown;
  extraInfo?: Record<string, any>;
};

export const logApiError = ({
  apiName,
  methodName,
  error,
  extraInfo = {},
}: ApiErrorParams) => {
  console.log('\n\n 🚀 ~ logApiError ~ error:', error);

  try {
    const time = new Date().toISOString();

    if (apiName) crashlytics().setAttribute('api_name', apiName);
    if (methodName) crashlytics().setAttribute('method_name', methodName);
    crashlytics().setAttribute('error_time', time);

    crashlytics().setAttribute('payload', JSON.stringify(extraInfo));

    crashlytics().log(
      `API Error → ${apiName || 'Unknown API'} | ${
        methodName || 'Unknown fn'
      } | ${time}`,
    );

    if (error instanceof Error) {
      crashlytics().recordError(error);
    } else {
      crashlytics().recordError(new Error(JSON.stringify(error)));
    }
  } catch (e) {
    console.log('Crashlytics logging failed', e);
  }
};
