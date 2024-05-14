export interface Column {
    value: string;
    isCentered?: boolean;
    isDate?: boolean;
    columnWidth?: string;
}

export const legalDocumentColumns: Column[] = [
    { value: 'kyHieu', columnWidth: '150px', isCentered: true, isDate: false },
    { value: 'banHanhTuNgay', columnWidth: '150px', isCentered: true, isDate: true },
    { value: 'trichYeu', columnWidth: '700px', isCentered: false, isDate: false },
    { value: 'coQuanBanHanh', columnWidth: '300px', isCentered: true, isDate: false },
];

export const MY_DATE_FORMAT = {
    parse: {
        dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
    },
    display: {
        dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

export const defaultLoaiVanBanOptions: string[] = [
    'Nghị quyết',
    'Quyết định',
    'Chỉ thị',
    'Quy chế',
    'Quy định',
    'Thông cáo',
    'Thông báo',
    'Hướng dẫn',
    'Chương trình',
    'Kế hoạch',
    'Phương án',
    'Đề án',
    'Dự án',
    'Báo cáo',
    'Biên bản',
    'Tờ trình',
    'Hợp đồng',
    'Công văn',
    'Công điện',
    'Bản ghi nhớ',
    'Bản thỏa thuận',
    'Giấy ủy quyền',
    'Giấy mời',
    'Giấy giới thiệu',
    'Giấy nghỉ phép',
    'Phiếu gửi',
    'Phiếu chuyển',
    'Phiếu báo',
    'Thư công',
];

export const defaultNguoiKyOptions: string[] = [
    'Nguyễn Minh Tuấn',
    'Lương Mai Anh',
    'Lê Thành Công',
    'Trần Văn Thuấn',
    'Dương Huy Lương',
];

export const defaultCoQuanBanHanhOptions: string[] = [
    'Cục Công nghệ thông tin',
    'Bộ Y Tế',
    'Thanh tra Bộ',
    'Cục Quản lý Dược',
];

export const defaultDonViSoanThaoOptions: string[] = [
    'Phòng Quản lý Kinh doanh Dược',
    'Cục Quản lý Khám chữa bệnh',
    'P. Phục hồi chức năng và giám định',
];

export const defaultDoKhanOptions: string[] = ['Khẩn', 'Bình thường'];

export const defaultDoMatOptions: string[] = ['Quan trọng', 'Bình thường'];
