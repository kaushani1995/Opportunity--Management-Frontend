export interface Opportunity{
    idOpportunity: number;
	createdBy: string;
	createdTS: Date;
	updatedBy: string;
	updatedTS: Date;
	idStatus: number;
	idTeam: number;
	idLocation: number;
	jobDesc: string;
	hiringManager: string;
	idPosition: number;
}

export interface Skillset{
    idSkillset: number;
    name: string;
}

export interface Team{
    idTeam: number;
    name: string;
}

export interface Location{
    idLocation: number;
    name: string;
}

export interface Position{
    idPosition: number;
    name: string;
}

export interface Status{
    idStatus: number;
    currStatus: string;
}

export interface User{
    email: string;
    name: string;
    role: string;
}

export interface OppAndSkills{

    opportunity : Opportunity;
    skills : Skillset[]
}