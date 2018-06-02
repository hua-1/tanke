package model.role;

import java.util.List;

public class UserApplicationTreeModel {
    private String name;
    private String applicationId;
    private String applicationName;
    private String id;
    private String text;
    private List<UserApplicationTreeModel> children;
    private Integer enabled;

    public Integer getEnabled() {
        return enabled;
    }

    public void setEnabled(Integer enabled) {
        this.enabled = enabled;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }

    public String getApplicationName() {
        return applicationName;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<UserApplicationTreeModel> getChildren() {
        return children;
    }

    public void setChildren(List<UserApplicationTreeModel> children) {
        this.children = children;
    }
}
