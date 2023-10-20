interface Answer {
    questionId: number;
    id: number;
    description: string;
    value: number;
    order: number;
    deletedAt: any;
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
    answerId: number
    submissionId?: number
}