import { createContext, useContext } from 'react';

interface StaffContextType {
  //  1. GET
  //  1a. receive general data
  selectedStaff: number[];
  setSelectedStaff: React.Dispatch<React.SetStateAction<number[]>>;
  //  1b. receive pagination data
  totalPage: number;
  setTotalPage: React.Dispatch<React.SetStateAction<number>>;
  //  1c. receive sorted data
  sortTarget: string;
  setSortTarget: React.Dispatch<React.SetStateAction<string>>;
  sortAsc: boolean;
  setSortAsc: React.Dispatch<React.SetStateAction<boolean>>;
  triggerSort: boolean;
  setTriggerSort: React.Dispatch<React.SetStateAction<boolean>>;
  //  1d. receive filtered data
  triggerFilter: boolean;
  setTriggerFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filterName: string;
  setFilterName: React.Dispatch<React.SetStateAction<string>>;
  filterGender: string;
  setFilterGender: React.Dispatch<React.SetStateAction<string>>;
  filterDepartment: string;
  setFilterDepartment: React.Dispatch<React.SetStateAction<string>>;
  filterPosition: string;
  setFilterPosition: React.Dispatch<React.SetStateAction<string>>;
  filterGrade: string;
  setFilterGrade: React.Dispatch<React.SetStateAction<string>>;
  filterEmail: string;
  setFilterEmail: React.Dispatch<React.SetStateAction<string>>;
  filterExtension: string;
  setFilterExtension: React.Dispatch<React.SetStateAction<string>>;
  filterDeptId: string | null;
  setFilterDeptId: React.Dispatch<React.SetStateAction<string | null>>;
  filterDateHiredFrom: string;
  setFilterDateHiredFrom: React.Dispatch<React.SetStateAction<string>>;
  filterDateHiredTo: string;
  setFilterDateHiredTo: React.Dispatch<React.SetStateAction<string>>;
  filterDateQuitFrom: string;
  setFilterDateQuitFrom: React.Dispatch<React.SetStateAction<string>>;
  filterDateQuitTo: string;
  setFilterDateQuitTo: React.Dispatch<React.SetStateAction<string>>;
  filterIsActive: boolean | null;
  setFilterIsActive: React.Dispatch<React.SetStateAction<boolean | null>>;
  filterCreatedFrom: string;
  setFilterCreatedFrom: React.Dispatch<React.SetStateAction<string>>;
  filterCreatedTo: string;
  setFilterCreatedTo: React.Dispatch<React.SetStateAction<string>>;
  filterUpdatedFrom: string;
  setFilterUpdatedFrom: React.Dispatch<React.SetStateAction<string>>;
  filterUpdatedTo: string;
  setFilterUpdatedTo: React.Dispatch<React.SetStateAction<string>>;
  //  2. POST
  //  2a. create new records
  triggerCreate: boolean;
  setTriggerCreate: React.Dispatch<React.SetStateAction<boolean>>;

  //  3. PATCH
  //  3a. update general details
  updateDetails: any;
  setUpdateDetails: React.Dispatch<React.SetStateAction<any>>;
  triggerUpdate: boolean;
  setTriggerUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  //  3b. update active status
  convertStatus: boolean | null;
  setConvertStatus: React.Dispatch<React.SetStateAction<boolean | null>>;
  triggerConvert: boolean;
  setTriggerConvert: React.Dispatch<React.SetStateAction<boolean>>;

  //  4. TEMP STATE
  isInitialised: boolean;
  setIsInitialised: React.Dispatch<React.SetStateAction<boolean>>;
  isGetting: boolean;
  setIsGetting: React.Dispatch<React.SetStateAction<boolean>>;
  isCreating: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdating: boolean;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  isConverting: boolean;
  setIsConverting: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StaffContext = createContext<StaffContextType | undefined>(
  undefined,
);

export const useStaffContext = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error(
      '[ManageStaff] error: missing useContext at context provider.',
    );
  }
  return context;
};
