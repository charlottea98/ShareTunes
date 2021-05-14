const profileNoData = (userExists: any, sessionStatus: any) => {
    if (userExists === null && sessionStatus !== null) {
        return <span>currently loading</span>;
    }
};

export default profileNoData;
