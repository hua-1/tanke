package dto.permission;

import java.util.List;

public class PermissionResponseDto {
    private List<PermissionDto> rows;

    public List<PermissionDto> getRows() {
        return rows;
    }

    public void setRows(List<PermissionDto> rows) {
        this.rows = rows;
    }
}
