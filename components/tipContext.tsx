import React, { createContext, useState, useContext, ReactNode } from 'react';
export const employees = ['Joan', 'Sean', 'Angelina', 'Paul', 'Nuala'];

interface EmployeeAmounts {
  [key: string]: number;
}

interface HistoricalRecord {
  amount: number;
  date: Date;
  server: string;
  employeesAmount: EmployeeAmounts;
}

interface TipContextType {
  history: HistoricalRecord[];
  calculateTip: (amount: number, serverName: string) => void;
  totalByEmployee: () => { name: string; amount: number }[];
}

const TipContext = createContext<TipContextType | undefined>(undefined);

interface TipProviderProps {
  children: ReactNode;
}

const TipProvider: React.FC<TipProviderProps> = ({ children }) => {
  const [history, setHistory] = useState<HistoricalRecord[]>([]);

  function calculateTip(amount: number, serverName: string) {
    const serverTip = amount * 0.3;
    const otherTip = amount - serverTip;
    const otherEmployees = employees.filter((name) => name !== serverName);
    const splitTip = otherTip / otherEmployees.length;

    const employeesAmount: EmployeeAmounts = {};
    employeesAmount[serverName] = serverTip;
    otherEmployees.forEach((name) => {
      employeesAmount[name] = splitTip;
    });

    const newRecord: HistoricalRecord = {
      amount,
      date: new Date(),
      server: serverName,
      employeesAmount,
    };

    setHistory((prevHistory) => [...prevHistory, newRecord]);
  }

  function totalByEmployee() {
    const totals: { [key: string]: number } = {};

    employees.forEach((name) => {
      totals[name] = 0;
    });

    history.forEach((item) => {
      Object.entries(item.employeesAmount).forEach(([employee, amount]) => {
        totals[employee] += amount;
      });
    });

    return Object.entries(totals).map(([name, amount]) => ({ name, amount }));
  }

  const value = { history, calculateTip, totalByEmployee };

  return <TipContext.Provider value={value}>{children}</TipContext.Provider>;
};

const useTipContext = () => {
  return useContext(TipContext);
};

export { useTipContext, TipProvider };
