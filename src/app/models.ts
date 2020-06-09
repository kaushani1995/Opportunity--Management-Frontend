export class Opportunity{
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

export class Skillset{
    idSkillset: number;
    name: string;
}

export class Team{
    idTeam: number;
    name: string;
}

export class Location{
    idLocation: number;
    name: string;
}

export class Position{
    idPosition: number;
    name: string;
}

export class Status{
    idStatus: number;
    currStatus: string;
}

export class User{
    email: string;
    name: string;
    role: string;
}

export class OppAndSkills{

    opportunity : Opportunity;
    skillset : number[];
}