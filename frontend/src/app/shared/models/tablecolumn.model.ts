export interface TableColumn {
    key: string;       // Matches the object property key
    label: string;     // Text displayed in header
    isCurrency?: boolean;
    isDate?: boolean;
}
