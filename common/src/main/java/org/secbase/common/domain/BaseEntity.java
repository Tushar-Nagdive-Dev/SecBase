package org.secbase.common.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;

import java.time.Instant;

@Getter
@Setter
public abstract class BaseEntity {

    @Id
    private Long id;

    @Version
    private Integer version;

    @CreatedDate
    private Instant createdTime;

    @LastModifiedDate
    private Instant modifiedTime;

    // Removed @CreatedBy / @LastModifiedBy to avoid conflict with your interceptor
    private String creator;
    private Long createdId;
    private String createdBy;

    private String modifier;
    private Long modifiedId;
    private String modifiedBy;
}