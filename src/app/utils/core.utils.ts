// returns a NEW OBJECT with all null and undefined properties removed
export const stripNullAndUndefinedProperties = (
  properties: Record<string, number | string | null | undefined>
): Record<string, string> => {
  const eventProperties = { ...properties };
  Object.keys(eventProperties).forEach(
    key =>
      (eventProperties[key] === null ||
        eventProperties[key] === undefined ||
        eventProperties[key] === '') &&
      delete eventProperties[key]
  );
  return eventProperties as Record<string, string>;
};

export const buildUrlParams = (queryParams: QueryParametersDef): string => {
  const rover = queryParams.rover;
  const params = stripNullAndUndefinedProperties({ ...queryParams, rover: '' });
  const urlParams = new URLSearchParams(params);
  console.log(`/${rover}/photos?${urlParams.toString()}`);

  return `/${rover}/photos?${urlParams.toString()}`;
};
