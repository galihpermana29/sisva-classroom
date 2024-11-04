import { createContext, useContext } from 'react';

type School = {
  abbreviation: string;
  additional_json_text: string;
  code: string;
  education_level: string;
  education_ownership_type: string;
  education_type: string;
  id: string;
  identifier_type: string;
  identifier_value: string;
  landing_image_uri: string | null | undefined | '';
  logo_uri: string | null | undefined | '';
  name: string;
  theme_json_text: string;
  landing_image_url: string | null;
  logo_url: string | null;
};

const SchoolContext = createContext<School | null>(null);

export default function SchoolIdProvider({
  children,
  schoolData,
}: {
  schoolData: School;
  children: React.ReactNode;
}) {
  return (
    <SchoolContext.Provider value={schoolData}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const schoolData = useContext(SchoolContext);
  if (!schoolData) {
    throw new Error('useSchoolId must be used within a SchoolIdProvider');
  }
  return schoolData;
}
