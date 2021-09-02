create table bungie_auth (
    discord_id varchar2(20) primary key,
    access_token varchar2(500) not null,
    token_type varchar2(30) not null,
    expires_in number not null,
    refresh_token varchar2(500) not null,
    refresh_expires_in number not null,
    membership_id varchar2(100) not null unique,
    added_date date default SYSDATE
);

create table bungie_auth_state_queue (
    discord_id varchar2(20) primary key,
    state varchar2(200) not null,
    queued_date date default SYSDATE
);

create table DESTINY_MEMBERSHIPS (
    BUNGIE_MEMBERSHIP_ID varchar2(32) not null,
    DESTINY_MEMBERSHIP_ID varchar2(32) primary key,
    DESTINY_MEMBERSHIP_TYPE number not null,
    DESTINY_DISPLAY_NAME varchar2(100) not null,
    IS_DEFAULT number(1) default 0
);

create table lfg (
    id number(4) primary key,
    title varchar2(200) not null,
    activity varchar2(200) not null,
    lfg_date date not null
);

CREATE TABLE LFG_MESSAGES (
    LFG_ID number(4) primary key references LFG(ID),
    GUILD_ID VARCHAR2(30) not null ,
    CHANNEL_ID VARCHAR(30) not null ,
    MESSAGE_ID VARCHAR(30) not null
);

CREATE TABLE LFG_LOG_CHANNEL (
                                 LFG_ID NUMBER PRIMARY KEY REFERENCES LFG(ID),
                                 GUILD_ID VARCHAR2(30) not null,
                                 IS_THREAD NUMBER(1) not null,
                                 CHANNEL_ID VARCHAR2(30) not null,
                                 THREAD_ID VARCHAR2(30)
);

CREATE TABLE LFG_USERS (
                           LFG_ID NUMBER PRIMARY KEY REFERENCES LFG(ID),
                           TYPE VARCHAR2(10) CHECK ( TYPE IN ('JOIN', 'ALTER', 'CREATOR') ) NOT NULL,
                           DISCORD_ID VARCHAR2(30) not null,
                           DESTINY_NAME VARCHAR2(100)
);