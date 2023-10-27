interface Answer {
    questionId: number;
    id: number;
    description: string;
    value: number;
    order: number;
    deletedAt: any;
    type: number;
}

interface Question {
    id: number;
    description: string;
    required: boolean;
    type: number;
    index: number;
    order: number;
    deletedAt: any;
    answers: Answer[];
}

interface Client {
    id: number
    name: string
    deletedAt: string | null
}

interface Project {
    clientId: number
    id: number
    name: string
    deletedAt: string | null
}

interface Submission {
    projectId: number
    //id: number
    //weightVersionId: number
    //deletedAt: null
    answeredQuestions: AnsweredQuestion[]
}

interface AnsweredQuestion {
    questionId: number
    answerId: number
    submissionId?: number
    text?: string
}

interface Grade {
    submissionId: number
    value: number
    weightVersion: number
    originalScore: number
}

interface Jwt {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string,
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string,
    exp: number
}

interface WeightVersion {
    id: number
    versionNumber: number
    versionName: string
    deletedAt: string | null
}