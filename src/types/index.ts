export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'student' | 'company_admin' | 'curator' | 'platform_admin';
    university?: string;
    company?: string;
    avatar?: string;
    skills?: string[];
    bio?: string;
    createdAt: Date;
}

export interface Company {
    id: string;
    name: string;
    description: string;
    logo?: string;
    website?: string;
    industry?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    companyId: string;
    companyName: string;
    curatorId?: string;
    curatorName?: string;
    status: 'draft' | 'recruiting' | 'in_progress' | 'completed' | 'cancelled';
    requiredSkills: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    timeline: {
        start: string;
        end: string;
    };
    maxParticipants: number;
    currentParticipants: number;
    createdAt: string;
    updatedAt: string;
    category: string;
    tags: string[];
}

export interface Application {
    id: string;
    projectId: string;
    projectTitle: string;
    studentId: string;
    studentName: string;
    status: 'pending' | 'approved' | 'rejected';
    message?: string;
    createdAt: string;
}

export interface Team {
    id: string;
    projectId: string;
    projectTitle: string;
    members: TeamMember[];
    tasks: Task[];
    chatMessages: ChatMessage[];
    createdAt: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatar?: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in_progress' | 'review' | 'done';
    assigneeId?: string;
    assigneeName?: string;
    dueDate?: string;
    createdAt: string;
}

export interface ChatMessage {
    id: string;
    userId: string;
    userName: string;
    message: string;
    timestamp: string;
}