export interface _Alert{
    type?: 'success' | 'error' | 'warning' | 'info';
    position?: 'top-left' | 'top-right' | 'top-center' | 'center-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
    animation?: 'left-to-right' | 'right-to-left' | 'bottom-to-top' | 'top-to-bottom';
    message?: string;
}