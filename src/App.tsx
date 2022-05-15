import React, {useState} from 'react';
import AppRoutes from "./routes/AppRoutes";
import './App.scss'
import {Link} from "react-router-dom";
import Button from "./components/ui/Button/Button";

export enum SortEnum {
    SORT_COMPANY = 'sort_company',
    SORT_CITY = 'sort_city'
}
export const SortContext = React.createContext<SortEnum | undefined>(undefined);

const App = () => {
    const [sortType, setSortType] = useState<SortEnum | undefined>(undefined)
    const onSortChange = (e:  React.MouseEvent<HTMLButtonElement>, sortType: SortEnum ) => {
        setSortType(sortType)
    };

    return (
        <div className={'appWrapper'}>
                <header className={'header'}>
                    <Link className={'link'} to={'/users'}>Users</Link>
                    <span>Сортировка</span>
                    <Button onClick={(e) => onSortChange(e, SortEnum.SORT_CITY)}>По городу</Button>
                    <Button onClick={(e) => onSortChange(e, SortEnum.SORT_COMPANY)}>По компании</Button>
                </header>
                <main className={'main'}>
                    <SortContext.Provider value={sortType}>
                        <AppRoutes/>
                    </SortContext.Provider>
                </main>
        </div>

    );
};

export default App;