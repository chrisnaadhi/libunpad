import {
  mysqlTable,
  int,
  datetime,
  text,
  index,
  varchar,
  char,
  smallint,
  mysqlEnum,
  unique,
  date,
  mediumtext,
  timestamp,
  longtext,
  tinyint,
  decimal,
  bigint,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const backupLog = mysqlTable("backup_log", {
  backupLogId: int("backup_log_id").autoincrement().notNull(),
  userId: int("user_id").default(0).notNull(),
  backupTime: datetime("backup_time", { mode: "string" }).default("NULL"),
  backupFile: text("backup_file").default("NULL"),
});

export const biblio = mysqlTable(
  "biblio",
  {
    biblioId: int("biblio_id").autoincrement().notNull(),
    gmdId: int("gmd_id"),
    title: text("title").notNull(),
    sor: varchar("sor", { length: 200 }).default("NULL"),
    edition: varchar("edition", { length: 50 }).default("NULL"),
    isbnIssn: varchar("isbn_issn", { length: 20 }).default("NULL"),
    publisherId: int("publisher_id"),
    publishYear: varchar("publish_year", { length: 20 }).default("NULL"),
    // Warning: Can't parse year(4) from database
    // year(4)Type: year(4)("year_published"),
    collation: varchar("collation", { length: 255 }).default("NULL"),
    seriesTitle: varchar("series_title", { length: 200 }).default("NULL"),
    callNumber: varchar("call_number", { length: 50 }).default("NULL"),
    languageId: char("language_id", { length: 5 }).default("en"),
    source: varchar("source", { length: 3 }).default("NULL"),
    publishPlaceId: int("publish_place_id"),
    classification: varchar("classification", { length: 40 }).default("NULL"),
    notes: text("notes").default("NULL"),
    image: varchar("image", { length: 100 }).default("NULL"),
    fileAtt: varchar("file_att", { length: 255 }).default("NULL"),
    opacHide: smallint("opac_hide"),
    promoted: smallint("promoted"),
    labels: text("labels").default("NULL"),
    frequencyId: int("frequency_id").default(0).notNull(),
    specDetailInfo: text("spec_detail_info").default("NULL"),
    contentTypeId: int("content_type_id"),
    mediaTypeId: int("media_type_id"),
    carrierTypeId: int("carrier_type_id"),
    inputDate: datetime("input_date", { mode: "string" }).default("NULL"),
    lastUpdate: datetime("last_update", { mode: "string" }).default("NULL"),
    uid: int("uid"),
    origBiblioId: int("orig_biblio_id"),
    nodeId: int("node_id"),
  },
  (table) => {
    return {
      referencesIdx: index("references_idx").on(
        table.gmdId,
        table.publisherId,
        table.languageId,
        table.publishPlaceId
      ),
      classification: index("classification").on(table.classification),
      flagIdx: index("biblio_flag_idx").on(table.opacHide, table.promoted),
      rdaIdx: index("rda_idx").on(
        table.contentTypeId,
        table.mediaTypeId,
        table.carrierTypeId
      ),
      uid: index("uid").on(table.uid),
      titleFtIdx: index("title_ft_idx").on(table.title, table.seriesTitle),
      notesFtIdx: index("notes_ft_idx").on(table.notes),
      labels: index("labels").on(table.labels),
    };
  }
);

export const biblioAttachment = mysqlTable(
  "biblio_attachment",
  {
    biblioId: int("biblio_id").notNull(),
    fileId: int("file_id").notNull(),
    placement: mysqlEnum("placement", ["link", "popup", "embed"]),
    accessType: mysqlEnum("access_type", ["public", "private"]).notNull(),
    accessLimit: text("access_limit").default("NULL"),
  },
  (table) => {
    return {
      biblioId: index("biblio_id").on(table.biblioId),
      fileId: index("file_id").on(table.fileId),
      biblioId2: index("biblio_id_2").on(table.biblioId, table.fileId),
    };
  }
);

export const biblioAuthor = mysqlTable(
  "biblio_author",
  {
    biblioId: int("biblio_id").default(0).notNull(),
    authorId: int("author_id").default(0).notNull(),
    level: int("level").default(1).notNull(),
  },
  (table) => {
    return {
      biblioId: index("biblio_id").on(table.biblioId),
      authorId: index("author_id").on(table.authorId),
    };
  }
);

export const biblioCustom = mysqlTable("biblio_custom", {
  biblioId: int("biblio_id").notNull(),
});

export const biblioLog = mysqlTable(
  "biblio_log",
  {
    biblioLogId: int("biblio_log_id").autoincrement().notNull(),
    biblioId: int("biblio_id").notNull(),
    userId: int("user_id").notNull(),
    realname: varchar("realname", { length: 100 }).notNull(),
    title: text("title").notNull(),
    ip: varchar("ip", { length: 200 }).notNull(),
    action: varchar("action", { length: 50 }).notNull(),
    affectedrow: varchar("affectedrow", { length: 50 }).notNull(),
    rawdata: text("rawdata").notNull(),
    additionalInformation: text("additional_information").notNull(),
    date: datetime("date", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      realname: index("realname").on(table.realname),
      biblioId: index("biblio_id").on(table.biblioId),
      userId: index("user_id").on(table.userId),
      ip: index("ip").on(table.ip),
      action: index("action").on(table.action),
      affectedrow: index("affectedrow").on(table.affectedrow),
      date: index("date").on(table.date),
      title: index("title").on(table.title),
      rawdata: index("rawdata").on(table.rawdata),
      additionalInformation: index("additional_information").on(
        table.additionalInformation
      ),
    };
  }
);

export const biblioMark = mysqlTable(
  "biblio_mark",
  {
    id: varchar("id", { length: 32 }).notNull(),
    memberId: varchar("member_id", { length: 20 }).notNull(),
    biblioId: int("biblio_id").notNull(),
    createdAt: datetime("created_at", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
  },
  (table) => {
    return {
      memberIdIdx: index("member_id_idx").on(table.memberId),
      biblioIdIdx: index("biblio_id_idx").on(table.biblioId),
      id: unique("id").on(table.id),
    };
  }
);

export const biblioRelation = mysqlTable("biblio_relation", {
  biblioId: int("biblio_id").default(0).notNull(),
  relBiblioId: int("rel_biblio_id").default(0).notNull(),
  relType: int("rel_type").default(1),
});

export const biblioRequisition = mysqlTable("biblio_requisition", {
  biblioRequisitionId: int("biblio_requisition_id").autoincrement().notNull(),
  memberId: varchar("member_id", { length: 20 }).notNull(),
  memberName: varchar("member_name", { length: 100 }).notNull(),
  isbn: varchar("isbn", { length: 13 }).default("NULL"),
  title: text("title").notNull(),
  author: varchar("author", { length: 100 }).notNull(),
  publisher: varchar("publisher", { length: 100 }).notNull(),
  publishYear: varchar("publish_year", { length: 4 }).default("NULL"),
  description: text("description").notNull(),
  priceCurrency: mysqlEnum("price_currency", ["idr", "usd"]).default("idr"),
  priceInDollar: int("price_in_dollar"),
  priceInRupiah: int("price_in_rupiah"),
  type: mysqlEnum("type", ["asing", "lokal"]).default("lokal"),
  information: text("information").notNull(),
  flag: mysqlEnum("flag", [
    "new",
    "evaluate",
    "ready",
    "pushed",
    "pulled",
    "requisition",
    "buy_process",
    "delivered",
  ]).default("new"),
  insertDate: datetime("insert_date", { mode: "string" }).default("NULL"),
  lastUpdate: datetime("last_update", { mode: "string" }).default("NULL"),
});

export const biblioTopic = mysqlTable(
  "biblio_topic",
  {
    biblioId: int("biblio_id").default(0).notNull(),
    topicId: int("topic_id").default(0).notNull(),
    level: int("level").default(1).notNull(),
  },
  (table) => {
    return {
      biblioId: index("biblio_id").on(table.biblioId),
      topicId: index("topic_id").on(table.topicId),
    };
  }
);

export const cache = mysqlTable(
  "cache",
  {
    name: varchar("name", { length: 64 }).notNull(),
    contents: text("contents").notNull(),
    createdAt: datetime("created_at", { mode: "string" }).notNull(),
    updatedAt: datetime("updated_at", { mode: "string" }).notNull(),
    expiredAt: datetime("expired_at", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      name: unique("name").on(table.name),
    };
  }
);

export const collectionsCount = mysqlTable("collections_count", {
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  tgl: date("Tgl", { mode: "string" }).default("NULL"),
  node: varchar("Node", { length: 2 }).notNull(),
  nodeName: varchar("NodeName", { length: 255 }).default("NULL"),
  jmlBiblio: bigint("JmlBiblio", { mode: "number" }).notNull(),
});

export const comment = mysqlTable("comment", {
  commentId: int("comment_id").autoincrement().notNull(),
  biblioId: int("biblio_id").notNull(),
  memberId: varchar("member_id", { length: 20 }).notNull(),
  comment: text("comment").notNull(),
  inputDate: datetime("input_date", { mode: "string" }).default("NULL"),
  lastUpdate: datetime("last_update", { mode: "string" }).default("NULL"),
});

export const content = mysqlTable("content", {
  contentId: int("content_id").default(0).notNull(),
  contentTitle: varchar("content_title", { length: 255 }).default("").notNull(),
  contentDesc: mediumtext("content_desc").default("").notNull(),
  contentPath: varchar("content_path", { length: 20 }).default("").notNull(),
  isNews: smallint("is_news"),
  isDraft: smallint("is_draft"),
  inputDate: datetime("input_date", { mode: "string" })
    .default("0000-00-00 00:00:00")
    .notNull(),
  lastUpdate: datetime("last_update", { mode: "string" })
    .default("0000-00-00 00:00:00")
    .notNull(),
  contentOwnpage: varchar("content_ownpage", { length: 1 })
    .default("")
    .notNull(),
  tbl: varchar("tbl", { length: 2 }).default("").notNull(),
});

export const content_ = mysqlTable(
  "content_",
  {
    contentId: int("content_id").autoincrement().notNull(),
    contentTitle: varchar("content_title", { length: 255 }).notNull(),
    contentDesc: text("content_desc").notNull(),
    contentPath: varchar("content_path", { length: 20 }).notNull(),
    isNews: smallint("is_news"),
    isDraft: smallint("is_draft"),
    inputDate: datetime("input_date", { mode: "string" }).notNull(),
    lastUpdate: datetime("last_update", { mode: "string" }).notNull(),
    contentOwnpage: mysqlEnum("content_ownpage", ["1", "2"])
      .default("1")
      .notNull(),
  },
  (table) => {
    return {
      itle: index("content_title").on(table.contentTitle),
      esc: index("content_desc").on(table.contentDesc),
      contentPath: unique("content_path").on(table.contentPath),
    };
  }
);

export const ddcContent = mysqlTable("ddc_content", {
  contentId: varchar("content_id", { length: 10 }).notNull(),
  contentText: text("content_text").notNull(),
});

export const ddcDb = mysqlTable("ddc_db", {
  clas: varchar("clas", { length: 20 }).notNull(),
  about: text("about").notNull(),
});

export const files = mysqlTable(
  "files",
  {
    fileId: int("file_id").autoincrement().notNull(),
    fileTitle: text("file_title").notNull(),
    fileName: text("file_name").notNull(),
    fileUrl: text("file_url").default("NULL"),
    fileDir: text("file_dir").default("NULL"),
    mimeType: varchar("mime_type", { length: 100 }).default("NULL"),
    fileDesc: text("file_desc").default("NULL"),
    fileKey: text("file_key").default("NULL"),
    uploaderId: int("uploader_id").notNull(),
    inputDate: datetime("input_date", { mode: "string" }).notNull(),
    lastUpdate: datetime("last_update", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      fileName: index("file_name").on(table.fileName),
      fileDir: index("file_dir").on(table.fileDir),
    };
  }
);

export const filesRead = mysqlTable("files_read", {
  filelogId: int("filelog_id").autoincrement().notNull(),
  fileId: int("file_id").notNull(),
  dateRead: timestamp("date_read", { mode: "string" })
    .default("current_timestamp()")
    .notNull(),
  memberId: varchar("member_id", { length: 20 }).default("NULL"),
  userId: int("user_id"),
  clientIp: varchar("client_ip", { length: 50 }).default("NULL"),
});

export const fines = mysqlTable(
  "fines",
  {
    finesId: int("fines_id").autoincrement().notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    finesDate: date("fines_date", { mode: "string" }).notNull(),
    memberId: varchar("member_id", { length: 20 }).notNull(),
    debet: int("debet").default(0),
    credit: int("credit").default(0),
    description: varchar("description", { length: 255 }).default("NULL"),
  },
  (table) => {
    return {
      memberId: index("member_id").on(table.memberId),
    };
  }
);

export const groupAccess = mysqlTable("group_access", {
  groupId: int("group_id").notNull(),
  moduleId: int("module_id").notNull(),
  menus: longtext("menus").default("NULL"),
  r: int("r").default(0).notNull(),
  w: int("w").default(0).notNull(),
});

export const holiday = mysqlTable(
  "holiday",
  {
    holidayId: int("holiday_id").autoincrement().notNull(),
    holidayDayname: varchar("holiday_dayname", { length: 20 }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    holidayDate: date("holiday_date", { mode: "string" }).default("NULL"),
    description: varchar("description", { length: 100 }).default("NULL"),
  },
  (table) => {
    return {
      holidayDayname: unique("holiday_dayname").on(
        table.holidayDayname,
        table.holidayDate
      ),
    };
  }
);

export const inbox = mysqlTable("inbox", {
  updatedInDb: timestamp("UpdatedInDB", { mode: "string" })
    .default("current_timestamp()")
    .notNull(),
  receivingDateTime: timestamp("ReceivingDateTime", { mode: "string" })
    .default("0000-00-00 00:00:00")
    .notNull(),
  text: text("Text").notNull(),
  senderNumber: varchar("SenderNumber", { length: 20 }).notNull(),
  coding: mysqlEnum("Coding", [
    "Default_No_Compression",
    "Unicode_No_Compression",
    "8bit",
    "Default_Compression",
    "Unicode_Compression",
  ])
    .default("Default_No_Compression")
    .notNull(),
  udh: text("UDH").notNull(),
  smscNumber: varchar("SMSCNumber", { length: 20 }).notNull(),
  class: int("Class").default(-1).notNull(),
  textDecoded: text("TextDecoded").notNull(),
  id: int("ID").autoincrement().notNull(),
  recipientId: text("RecipientID").notNull(),
  processed: mysqlEnum("Processed", ["false", "true"])
    .default("false")
    .notNull(),
});

export const indexDocuments = mysqlTable(
  "index_documents",
  {
    documentId: int("document_id").notNull(),
    wordId: bigint("word_id", { mode: "number" }).notNull(),
    location: varchar("location", { length: 50 }).notNull(),
    hitCount: int("hit_count").notNull(),
  },
  (table) => {
    return {
      documentId: index("document_id").on(table.documentId),
      wordId: index("word_id").on(table.wordId),
      location: index("location").on(table.location),
    };
  }
);

export const indexWords = mysqlTable("index_words", {
  id: bigint("id", { mode: "number" }).autoincrement().notNull(),
  word: varchar("word", { length: 50 }).notNull(),
  numHits: int("num_hits").notNull(),
  docHits: int("doc_hits").notNull(),
});

export const item = mysqlTable(
  "item",
  {
    itemId: int("item_id").autoincrement().notNull(),
    biblioId: int("biblio_id"),
    callNumber: varchar("call_number", { length: 50 }).default("NULL"),
    collTypeId: int("coll_type_id"),
    itemCode: varchar("item_code", { length: 20 }).default("NULL"),
    inventoryCode: varchar("inventory_code", { length: 200 }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    receivedDate: date("received_date", { mode: "string" }).default("NULL"),
    supplierId: varchar("supplier_id", { length: 6 }).default("NULL"),
    orderNo: varchar("order_no", { length: 20 }).default("NULL"),
    locationId: varchar("location_id", { length: 3 }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    orderDate: date("order_date", { mode: "string" }).default("NULL"),
    itemStatusId: char("item_status_id", { length: 3 }).default("NULL"),
    site: varchar("site", { length: 50 }).default("NULL"),
    source: int("source").default(0).notNull(),
    invoice: varchar("invoice", { length: 20 }).default("NULL"),
    price: int("price"),
    priceCurrency: varchar("price_currency", { length: 10 }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    invoiceDate: date("invoice_date", { mode: "string" }).default("NULL"),
    inputDate: datetime("input_date", { mode: "string" }).notNull(),
    lastUpdate: datetime("last_update", { mode: "string" }).default("NULL"),
    uid: int("uid"),
  },
  (table) => {
    return {
      uid: index("uid").on(table.uid),
      referencesIdx: index("item_references_idx").on(
        table.collTypeId,
        table.locationId,
        table.itemStatusId
      ),
      biblioIdIdx: index("biblio_id_idx").on(table.biblioId),
      itemCode: unique("item_code").on(table.itemCode),
    };
  }
);

export const kardex = mysqlTable(
  "kardex",
  {
    kardexId: int("kardex_id").autoincrement().notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    dateExpected: date("date_expected", { mode: "string" }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    dateReceived: date("date_received", { mode: "string" }).default("NULL"),
    seqNumber: varchar("seq_number", { length: 25 }).default("NULL"),
    notes: text("notes").default("NULL"),
    serialId: int("serial_id"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      fkSerial: index("fk_serial").on(table.serialId),
    };
  }
);

export const loan = mysqlTable(
  "loan",
  {
    loanId: int("loan_id").autoincrement().notNull(),
    itemCode: varchar("item_code", { length: 20 }).default("NULL"),
    collTypeName: varchar("coll_type_name", { length: 100 }).notNull(),
    title: text("title").notNull(),
    collNodeId: int("coll_node_id").notNull(),
    memberId: varchar("member_id", { length: 20 }).default("NULL"),
    memberName: varchar("member_name", { length: 100 }).notNull(),
    memberNodeId: int("member_node_id").notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    loanDate: date("loan_date", { mode: "string" }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    dueDate: date("due_date", { mode: "string" }).notNull(),
    renewed: int("renewed").default(0).notNull(),
    loanRulesId: int("loan_rules_id").default(0).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    actual: date("actual", { mode: "string" }).default("NULL"),
    isLent: int("is_lent").default(0).notNull(),
    isReturn: int("is_return").default(0).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    returnDate: date("return_date", { mode: "string" }).default("NULL"),
    inputDate: datetime("input_date", { mode: "string" }).default("NULL"),
    lastUpdate: datetime("last_update", { mode: "string" }).default("NULL"),
    uid: int("uid"),
  },
  (table) => {
    return {
      itemCode: index("item_code").on(table.itemCode),
      memberId: index("member_id").on(table.memberId),
      inputDate: index("input_date").on(
        table.inputDate,
        table.lastUpdate,
        table.uid
      ),
    };
  }
);

export const loanHistory = mysqlTable(
  "loan_history",
  {
    loanId: int("loan_id").notNull(),
    itemCode: varchar("item_code", { length: 20 }).default("NULL"),
    biblioId: int("biblio_id").notNull(),
    title: varchar("title", { length: 300 }).default("NULL"),
    callNumber: varchar("call_number", { length: 50 }).default("NULL"),
    classification: varchar("classification", { length: 40 }).default("NULL"),
    gmdName: varchar("gmd_name", { length: 30 }).default("NULL"),
    languageName: varchar("language_name", { length: 20 }).default("NULL"),
    locationName: varchar("location_name", { length: 100 }).default("NULL"),
    collectionTypeName: varchar("collection_type_name", {
      length: 100,
    }).default("NULL"),
    memberId: varchar("member_id", { length: 20 }).default("NULL"),
    memberName: varchar("member_name", { length: 100 }).default("NULL"),
    memberTypeName: varchar("member_type_name", { length: 64 }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    loanDate: date("loan_date", { mode: "string" }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    dueDate: date("due_date", { mode: "string" }).default("NULL"),
    renewed: int("renewed").default(0).notNull(),
    isLent: int("is_lent").default(0).notNull(),
    isReturn: int("is_return").default(0).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    returnDate: date("return_date", { mode: "string" }).default("NULL"),
    inputDate: datetime("input_date", { mode: "string" }).default("NULL"),
    lastUpdate: datetime("last_update", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      memberName: index("member_name").on(table.memberName),
    };
  }
);

export const member = mysqlTable(
  "member",
  {
    memberId: varchar("member_id", { length: 20 }).notNull(),
    memberName: varchar("member_name", { length: 100 }).notNull(),
    gender: int("gender").notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    birthDate: date("birth_date", { mode: "string" }).default("NULL"),
    memberTypeId: int("member_type_id"),
    memberAddress: varchar("member_address", { length: 255 }).default("NULL"),
    memberMailAddress: varchar("member_mail_address", { length: 255 }).default(
      "NULL"
    ),
    memberEmail: varchar("member_email", { length: 100 }).default("NULL"),
    postalCode: varchar("postal_code", { length: 20 }).default("NULL"),
    instName: varchar("inst_name", { length: 100 }).default("NULL"),
    isNew: int("is_new"),
    memberImage: varchar("member_image", { length: 200 }).default("NULL"),
    pin: varchar("pin", { length: 50 }).default("NULL"),
    memberPhone: varchar("member_phone", { length: 50 }).default("NULL"),
    memberFax: varchar("member_fax", { length: 50 }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    memberSinceDate: date("member_since_date", { mode: "string" }).default(
      "NULL"
    ),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    registerDate: date("register_date", { mode: "string" }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    expireDate: date("expire_date", { mode: "string" }).notNull(),
    memberNotes: text("member_notes").default("NULL"),
    isPending: smallint("is_pending").notNull(),
    mpasswd: varchar("mpasswd", { length: 64 }).default("NULL"),
    lastLogin: datetime("last_login", { mode: "string" }).default("NULL"),
    lastLoginIp: varchar("last_login_ip", { length: 20 }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      name: index("member_name").on(table.memberName),
      typeId: index("member_type_id").on(table.memberTypeId),
    };
  }
);

export const memberCustom = mysqlTable("member_custom", {
  memberId: varchar("member_id", { length: 20 }).notNull(),
  nodeId: int("node_id"),
});

export const mstAuthor = mysqlTable(
  "mst_author",
  {
    authorId: int("author_id").autoincrement().notNull(),
    authorName: varchar("author_name", { length: 100 }).notNull(),
    authorYear: varchar("author_year", { length: 20 }).default("NULL"),
    authorityType: mysqlEnum("authority_type", ["p", "o", "c"]).default("p"),
    authList: varchar("auth_list", { length: 20 }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      authorName: unique("author_name").on(
        table.authorName,
        table.authorityType
      ),
    };
  }
);

export const mstCarrierType = mysqlTable(
  "mst_carrier_type",
  {
    id: int("id").autoincrement().notNull(),
    carrierType: varchar("carrier_type", { length: 100 }).notNull(),
    code: varchar("code", { length: 5 }).notNull(),
    code2: char("code2", { length: 1 }).notNull(),
    inputDate: datetime("input_date", { mode: "string" }).notNull(),
    lastUpdate: datetime("last_update", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      code: index("code").on(table.code),
      mediaType: unique("media_type").on(table.carrierType),
    };
  }
);

export const mstCollType = mysqlTable(
  "mst_coll_type",
  {
    collTypeId: int("coll_type_id").autoincrement().notNull(),
    collTypeName: varchar("coll_type_name", { length: 30 }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      collTypeName: unique("coll_type_name").on(table.collTypeName),
    };
  }
);

export const mstContentType = mysqlTable(
  "mst_content_type",
  {
    id: int("id").autoincrement().notNull(),
    contentType: varchar("content_type", { length: 100 }).notNull(),
    code: varchar("code", { length: 5 }).notNull(),
    code2: char("code2", { length: 1 }).notNull(),
    inputDate: datetime("input_date", { mode: "string" }).notNull(),
    lastUpdate: datetime("last_update", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      code: index("code").on(table.code),
      contentType: unique("content_type").on(table.contentType),
    };
  }
);

export const mstCustomField = mysqlTable(
  "mst_custom_field",
  {
    fieldId: int("field_id").autoincrement().notNull(),
    primaryTable: varchar("primary_table", { length: 100 }).default("NULL"),
    dbfield: varchar("dbfield", { length: 50 }).notNull(),
    label: varchar("label", { length: 80 }).notNull(),
    type: mysqlEnum("type", [
      "text",
      "checklist",
      "numeric",
      "dropdown",
      "longtext",
      "choice",
      "date",
    ]).notNull(),
    default: varchar("default", { length: 80 }).default("NULL"),
    max: int("max"),
    data: text("data").default("NULL"),
    indexed: tinyint("indexed"),
    class: varchar("class", { length: 100 }).default("NULL"),
    isPublic: tinyint("is_public"),
    width: int("width").default(100),
    note: text("note").default("NULL"),
  },
  (table) => {
    return {
      fieldId: unique("field_id").on(table.fieldId),
    };
  }
);

export const mstFrequency = mysqlTable("mst_frequency", {
  frequencyId: int("frequency_id").autoincrement().notNull(),
  frequency: varchar("frequency", { length: 25 }).notNull(),
  languagePrefix: varchar("language_prefix", { length: 5 }).default("NULL"),
  timeIncrement: smallint("time_increment"),
  timeUnit: mysqlEnum("time_unit", ["day", "week", "month", "year"]).default(
    "day"
  ),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  inputDate: date("input_date", { mode: "string" }).notNull(),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  lastUpdate: date("last_update", { mode: "string" }).notNull(),
});

export const mstGmd = mysqlTable(
  "mst_gmd",
  {
    gmdId: int("gmd_id").autoincrement().notNull(),
    gmdCode: varchar("gmd_code", { length: 3 }).default("NULL"),
    gmdName: varchar("gmd_name", { length: 30 }).notNull(),
    iconImage: varchar("icon_image", { length: 100 }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      gmdName: unique("gmd_name").on(table.gmdName),
      gmdCode: unique("gmd_code").on(table.gmdCode),
    };
  }
);

export const mstItemStatus = mysqlTable(
  "mst_item_status",
  {
    itemStatusId: char("item_status_id", { length: 3 }).notNull(),
    itemStatusName: varchar("item_status_name", { length: 30 }).notNull(),
    rules: varchar("rules", { length: 255 }).default("NULL"),
    noLoan: smallint("no_loan").notNull(),
    skipStockTake: smallint("skip_stock_take").notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      itemStatusName: unique("item_status_name").on(table.itemStatusName),
    };
  }
);

export const mstLabel = mysqlTable(
  "mst_label",
  {
    labelId: int("label_id").autoincrement().notNull(),
    labelName: varchar("label_name", { length: 20 }).notNull(),
    labelDesc: varchar("label_desc", { length: 50 }).default("NULL"),
    labelImage: varchar("label_image", { length: 200 }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      labelName: unique("label_name").on(table.labelName),
    };
  }
);

export const mstLanguage = mysqlTable(
  "mst_language",
  {
    languageId: char("language_id", { length: 5 }).notNull(),
    languageName: varchar("language_name", { length: 20 }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      languageName: unique("language_name").on(table.languageName),
    };
  }
);

export const mstLoanRules = mysqlTable("mst_loan_rules", {
  loanRulesId: int("loan_rules_id").autoincrement().notNull(),
  memberTypeId: int("member_type_id").default(0).notNull(),
  collTypeId: int("coll_type_id").default(0),
  gmdId: int("gmd_id").default(0),
  loanLimit: int("loan_limit").default(0),
  loanPeriode: int("loan_periode").default(0),
  reborrowLimit: int("reborrow_limit").default(0),
  fineEachDay: int("fine_each_day").default(0),
  gracePeriode: int("grace_periode").default(0),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  inputDate: date("input_date", { mode: "string" }).default("NULL"),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  lastUpdate: date("last_update", { mode: "string" }).default("NULL"),
});

export const mstLocation = mysqlTable(
  "mst_location",
  {
    locationId: varchar("location_id", { length: 3 }).notNull(),
    locationName: varchar("location_name", { length: 100 }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      locationName: unique("location_name").on(table.locationName),
    };
  }
);

export const mstMediaType = mysqlTable(
  "mst_media_type",
  {
    id: int("id").autoincrement().notNull(),
    mediaType: varchar("media_type", { length: 100 }).notNull(),
    code: varchar("code", { length: 5 }).notNull(),
    code2: char("code2", { length: 1 }).notNull(),
    inputDate: datetime("input_date", { mode: "string" }).notNull(),
    lastUpdate: datetime("last_update", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      code: index("code").on(table.code),
      mediaType: unique("media_type").on(table.mediaType),
    };
  }
);

export const mstMemberType = mysqlTable(
  "mst_member_type",
  {
    memberTypeId: int("member_type_id").autoincrement().notNull(),
    memberTypeName: varchar("member_type_name", { length: 50 }).notNull(),
    loanLimit: int("loan_limit").notNull(),
    loanPeriode: int("loan_periode").notNull(),
    enableReserve: int("enable_reserve").default(0).notNull(),
    reserveLimit: int("reserve_limit").default(0).notNull(),
    memberPeriode: int("member_periode").notNull(),
    reborrowLimit: int("reborrow_limit").notNull(),
    fineEachDay: int("fine_each_day").notNull(),
    gracePeriode: int("grace_periode").default(0),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      memberTypeName: unique("member_type_name").on(table.memberTypeName),
    };
  }
);

export const mstModule = mysqlTable(
  "mst_module",
  {
    moduleId: int("module_id").autoincrement().notNull(),
    moduleName: varchar("module_name", { length: 50 }).notNull(),
    modulePath: varchar("module_path", { length: 200 }).default("NULL"),
    moduleDesc: varchar("module_desc", { length: 255 }).default("NULL"),
  },
  (table) => {
    return {
      moduleName: unique("module_name").on(table.moduleName, table.modulePath),
    };
  }
);

export const mstPlace = mysqlTable(
  "mst_place",
  {
    placeId: int("place_id").autoincrement().notNull(),
    placeName: varchar("place_name", { length: 30 }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      placeName: unique("place_name").on(table.placeName),
    };
  }
);

export const mstPublisher = mysqlTable(
  "mst_publisher",
  {
    publisherId: int("publisher_id").autoincrement().notNull(),
    publisherName: varchar("publisher_name", { length: 100 }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      publisherName: unique("publisher_name").on(table.publisherName),
    };
  }
);

export const mstRelationTerm = mysqlTable("mst_relation_term", {
  id: int("ID").autoincrement().notNull(),
  rtId: varchar("rt_id", { length: 11 }).notNull(),
  rtDesc: varchar("rt_desc", { length: 50 }).notNull(),
});

export const mstServers = mysqlTable("mst_servers", {
  serverId: int("server_id").autoincrement().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  uri: text("uri").notNull(),
  serverType: tinyint("server_type").default(1).notNull(),
  inputDate: datetime("input_date", { mode: "string" }).notNull(),
  lastUpdate: datetime("last_update", { mode: "string" }).default("NULL"),
});

export const mstSupplier = mysqlTable(
  "mst_supplier",
  {
    supplierId: int("supplier_id").autoincrement().notNull(),
    supplierName: varchar("supplier_name", { length: 100 }).notNull(),
    address: varchar("address", { length: 100 }).default("NULL"),
    postalCode: char("postal_code", { length: 10 }).default("NULL"),
    phone: char("phone", { length: 14 }).default("NULL"),
    contact: char("contact", { length: 30 }).default("NULL"),
    fax: char("fax", { length: 14 }).default("NULL"),
    account: char("account", { length: 12 }).default("NULL"),
    eMail: char("e_mail", { length: 80 }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      supplierName: unique("supplier_name").on(table.supplierName),
    };
  }
);

export const mstTopic = mysqlTable(
  "mst_topic",
  {
    topicId: int("topic_id").autoincrement().notNull(),
    topic: varchar("topic", { length: 50 }).notNull(),
    topicType: mysqlEnum("topic_type", [
      "t",
      "g",
      "n",
      "tm",
      "gr",
      "oc",
    ]).notNull(),
    authList: varchar("auth_list", { length: 20 }).default("NULL"),
    classification: varchar("classification", { length: 50 }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      topic: unique("topic").on(table.topic, table.topicType),
    };
  }
);

export const mstVisitorRoom = mysqlTable(
  "mst_visitor_room",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 50 }).notNull(),
    uniqueCode: varchar("unique_code", { length: 5 }).notNull(),
    createdAt: datetime("created_at", { mode: "string" }).default("NULL"),
    updatedAt: datetime("updated_at", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
  },
  (table) => {
    return {
      uniqueCodeIdx: index("unique_code_idx").on(table.uniqueCode),
      uniqueCodeUnq: unique("unique_code_unq").on(table.uniqueCode),
    };
  }
);

export const mstVocCtrl = mysqlTable("mst_voc_ctrl", {
  vocabolaryId: int("vocabolary_id").autoincrement().notNull(),
  topicId: int("topic_id").notNull(),
  rtId: varchar("rt_id", { length: 11 }).notNull(),
  relatedTopicId: varchar("related_topic_id", { length: 250 }).notNull(),
  scope: text("scope").default("NULL"),
});

export const node = mysqlTable(
  "node",
  {
    nodeId: int("node_id").autoincrement().notNull(),
    nodeName: varchar("node_name", { length: 255 }).notNull(),
    configName: varchar("config_name", { length: 32 }).notNull(),
    prefix: varchar("prefix", { length: 20 }).notNull(),
    createAt: datetime("create_at", { mode: "string" }).notNull(),
    updateAt: datetime("update_at", { mode: "string" }).default("NULL"),
    deleteAt: datetime("delete_at", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      nodeIsUnique: unique("node_is_unique").on(table.prefix),
    };
  }
);

export const nodes = mysqlTable("nodes", {
  id: int("id").autoincrement().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  config: varchar("config", { length: 36 }).notNull(),
  image: text("image").default("NULL"),
  createdAt: timestamp("created_at", { mode: "string" }).default("NULL"),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .default("current_timestamp()")
    .notNull(),
});

export const notification = mysqlTable("notification", {
  notifId: int("notif_id").autoincrement().notNull(),
  memberId: varchar("member_id", { length: 20 }).notNull(),
  send: int("send").default(0).notNull(),
  sendDate: datetime("send_date", { mode: "string" }).notNull(),
});

export const otherInbox = mysqlTable(
  "other_inbox",
  {
    updatedInDb: timestamp("UpdatedInDB", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
    insertIntoDb: timestamp("InsertIntoDB", { mode: "string" })
      .default("0000-00-00 00:00:00")
      .notNull(),
    sendingDateTime: timestamp("SendingDateTime", { mode: "string" })
      .default("0000-00-00 00:00:00")
      .notNull(),
    text: text("Text").default("NULL"),
    destinationNumber: varchar("DestinationNumber", { length: 20 }).notNull(),
    coding: mysqlEnum("Coding", [
      "Default_No_Compression",
      "Unicode_No_Compression",
      "8bit",
      "Default_Compression",
      "Unicode_Compression",
    ])
      .default("Default_No_Compression")
      .notNull(),
    udh: text("UDH").default("NULL"),
    class: int("Class").default(-1),
    textDecoded: text("TextDecoded").notNull(),
    id: int("ID").autoincrement().notNull(),
    multiPart: mysqlEnum("MultiPart", ["false", "true"]).default("false"),
    relativeValidity: int("RelativeValidity").default(-1),
    senderId: varchar("SenderID", { length: 255 }).default("NULL"),
    sendingTimeOut: timestamp("SendingTimeOut", { mode: "string" }).default(
      "0000-00-00 00:00:00"
    ),
    deliveryReport: mysqlEnum("DeliveryReport", [
      "default",
      "yes",
      "no",
    ]).default("default"),
    creatorId: text("CreatorID").notNull(),
  },
  (table) => {
    return {
      outboxDate: index("outbox_date").on(
        table.sendingDateTime,
        table.sendingTimeOut
      ),
      outboxSender: index("outbox_sender").on(table.senderId),
    };
  }
);

export const outbox = mysqlTable(
  "outbox",
  {
    updatedInDb: timestamp("UpdatedInDB", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
    insertIntoDb: timestamp("InsertIntoDB", { mode: "string" })
      .default("0000-00-00 00:00:00")
      .notNull(),
    sendingDateTime: timestamp("SendingDateTime", { mode: "string" })
      .default("0000-00-00 00:00:00")
      .notNull(),
    text: text("Text").default("NULL"),
    destinationNumber: varchar("DestinationNumber", { length: 20 }).notNull(),
    coding: mysqlEnum("Coding", [
      "Default_No_Compression",
      "Unicode_No_Compression",
      "8bit",
      "Default_Compression",
      "Unicode_Compression",
    ])
      .default("Default_No_Compression")
      .notNull(),
    udh: text("UDH").default("NULL"),
    class: int("Class").default(-1),
    textDecoded: text("TextDecoded").notNull(),
    id: int("ID").autoincrement().notNull(),
    multiPart: mysqlEnum("MultiPart", ["false", "true"]).default("false"),
    relativeValidity: int("RelativeValidity").default(-1),
    senderId: varchar("SenderID", { length: 255 }).default("NULL"),
    sendingTimeOut: timestamp("SendingTimeOut", { mode: "string" }).default(
      "0000-00-00 00:00:00"
    ),
    deliveryReport: mysqlEnum("DeliveryReport", [
      "default",
      "yes",
      "no",
    ]).default("default"),
    creatorId: text("CreatorID").notNull(),
  },
  (table) => {
    return {
      date: index("outbox_date").on(
        table.sendingDateTime,
        table.sendingTimeOut
      ),
      sender: index("outbox_sender").on(table.senderId),
    };
  }
);

export const outboxMultipart = mysqlTable("outbox_multipart", {
  text: text("Text").default("NULL"),
  coding: mysqlEnum("Coding", [
    "Default_No_Compression",
    "Unicode_No_Compression",
    "8bit",
    "Default_Compression",
    "Unicode_Compression",
  ])
    .default("Default_No_Compression")
    .notNull(),
  udh: text("UDH").default("NULL"),
  class: int("Class").default(-1),
  textDecoded: text("TextDecoded").default("NULL"),
  id: int("ID").default(0).notNull(),
  sequencePosition: int("SequencePosition").default(1).notNull(),
});

export const plugins = mysqlTable(
  "plugins",
  {
    id: varchar("id", { length: 32 }).notNull(),
    path: text("path").notNull(),
    options: longtext("options").default("NULL"),
    createdAt: datetime("created_at", { mode: "string" }).notNull(),
    updatedAt: datetime("updated_at", { mode: "string" }).default("NULL"),
    deletedAt: datetime("deleted_at", { mode: "string" }).default("NULL"),
    uid: int("uid").notNull(),
  },
  (table) => {
    return {
      id: unique("id").on(table.id),
    };
  }
);

export const reserve = mysqlTable(
  "reserve",
  {
    reserveId: int("reserve_id").autoincrement().notNull(),
    memberId: varchar("member_id", { length: 20 }).notNull(),
    biblioId: int("biblio_id").notNull(),
    itemCode: varchar("item_code", { length: 20 }).notNull(),
    reserveDate: datetime("reserve_date", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      referencesIdx: index("references_idx").on(table.memberId, table.biblioId),
      itemCodeIdx: index("item_code_idx").on(table.itemCode),
    };
  }
);

export const searchBiblio = mysqlTable(
  "search_biblio",
  {
    biblioId: int("biblio_id").autoincrement().notNull(),
    // nodeId: int("node_id"),
    node: varchar("node", { length: 255 }).default("NULL"),
    origBiblioId: int("orig_biblio_id"),
    title: text("title").default("NULL"),
    edition: varchar("edition", { length: 50 }).default("NULL"),
    isbnIssn: varchar("isbn_issn", { length: 20 }).default("NULL"),
    author: text("author").default("NULL"),
    topic: text("topic").default("NULL"),
    gmd: varchar("gmd", { length: 30 }).default("NULL"),
    publisher: varchar("publisher", { length: 100 }).default("NULL"),
    publishPlace: varchar("publish_place", { length: 30 }).default("NULL"),
    language: varchar("language", { length: 20 }).default("NULL"),
    classification: varchar("classification", { length: 40 }).default("NULL"),
    specDetailInfo: text("spec_detail_info").default("NULL"),
    carrierType: varchar("carrier_type", { length: 100 }).default(""),
    contentType: varchar("content_type", { length: 100 }).default("NULL"),
    mediaType: varchar("media_type", { length: 100 }).default("NULL"),
    location: text("location").default("NULL"),
    publishYear: varchar("publish_year", { length: 20 }).default("NULL"),
    // Warning: Can't parse year(4) from database
    // year(4)Type: year(4)("year_published"),
    notes: text("notes").default("NULL"),
    seriesTitle: text("series_title").default("NULL"),
    items: text("items").default("NULL"),
    collectionTypes: text("collection_types").default("NULL"),
    callNumber: varchar("call_number", { length: 50 }).default("NULL"),
    opacHide: smallint("opac_hide").notNull(),
    promoted: smallint("promoted").notNull(),
    labels: text("labels").default("NULL"),
    collation: varchar("collation", { length: 255 }).default("NULL"),
    image: varchar("image", { length: 100 }).default("NULL"),
    inputDate: datetime("input_date", { mode: "string" }).default("NULL"),
    lastUpdate: datetime("last_update", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      addIndexes: index("add_indexes").on(
        table.gmd,
        table.publisher,
        table.publishPlace,
        table.language,
        table.classification,
        table.publishYear,
        table.callNumber
      ),
      addIndexes2: index("add_indexes2").on(table.opacHide, table.promoted),
      rdaIndexes: index("rda_indexes").on(
        table.carrierType,
        table.mediaType,
        table.contentType
      ),
      author: index("author").on(table.author),
      topic: index("topic").on(table.topic),
      location: index("location").on(table.location),
      items: index("items").on(table.items),
      collectionTypes: index("collection_types").on(table.collectionTypes),
      labels: index("labels").on(table.labels),
      title: index("title").on(table.title, table.seriesTitle),
      biblioId: unique("biblio_id").on(table.biblioId),
    };
  }
);

export const searchBiblioTemporary = mysqlTable(
  "search_biblio_temporary",
  {
    biblioId: bigint("biblio_id", { mode: "number" }).autoincrement().notNull(),
    node: varchar("node", { length: 255 }).default("NULL"),
    origBiblioId: int("orig_biblio_id"),
    title: text("title").default("NULL"),
    edition: varchar("edition", { length: 50 }).default("NULL"),
    isbnIssn: varchar("isbn_issn", { length: 20 }).default("NULL"),
    author: text("author").default("NULL"),
    topic: text("topic").default("NULL"),
    gmd: varchar("gmd", { length: 30 }).default("NULL"),
    publisher: varchar("publisher", { length: 100 }).default("NULL"),
    publishPlace: varchar("publish_place", { length: 30 }).default("NULL"),
    language: varchar("language", { length: 20 }).default("NULL"),
    classification: varchar("classification", { length: 40 }).default("NULL"),
    specDetailInfo: text("spec_detail_info").default("NULL"),
    carrierType: varchar("carrier_type", { length: 100 }).default(""),
    contentType: varchar("content_type", { length: 100 }).default("NULL"),
    mediaType: varchar("media_type", { length: 100 }).default("NULL"),
    location: text("location").default("NULL"),
    publishYear: varchar("publish_year", { length: 20 }).default("NULL"),
    notes: text("notes").default("NULL"),
    seriesTitle: text("series_title").default("NULL"),
    items: text("items").default("NULL"),
    collectionTypes: text("collection_types").default("NULL"),
    callNumber: varchar("call_number", { length: 50 }).default("NULL"),
    opacHide: smallint("opac_hide").notNull(),
    promoted: smallint("promoted").notNull(),
    labels: text("labels").default("NULL"),
    collation: varchar("collation", { length: 100 }).default("NULL"),
    image: varchar("image", { length: 100 }).default("NULL"),
    inputDate: datetime("input_date", { mode: "string" }).default("NULL"),
    lastUpdate: datetime("last_update", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      addIndexes: index("add_indexes").on(
        table.gmd,
        table.publisher,
        table.publishPlace,
        table.language,
        table.classification,
        table.publishYear,
        table.callNumber
      ),
      addIndexes2: index("add_indexes2").on(table.opacHide, table.promoted),
      rdaIndexes: index("rda_indexes").on(
        table.carrierType,
        table.mediaType,
        table.contentType
      ),
      title: index("title").on(table.title),
      author: index("author").on(table.author),
      topic: index("topic").on(table.topic),
      location: index("location").on(table.location),
      items: index("items").on(table.items),
      collectionTypes: index("collection_types").on(table.collectionTypes),
      labels: index("labels").on(table.labels),
      biblioId: unique("biblio_id").on(table.biblioId),
    };
  }
);

export const sentitems = mysqlTable(
  "sentitems",
  {
    updatedInDb: timestamp("UpdatedInDB", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
    insertIntoDb: timestamp("InsertIntoDB", { mode: "string" })
      .default("0000-00-00 00:00:00")
      .notNull(),
    sendingDateTime: timestamp("SendingDateTime", { mode: "string" })
      .default("0000-00-00 00:00:00")
      .notNull(),
    deliveryDateTime: timestamp("DeliveryDateTime", { mode: "string" }).default(
      "NULL"
    ),
    text: text("Text").notNull(),
    destinationNumber: varchar("DestinationNumber", { length: 20 }).notNull(),
    coding: mysqlEnum("Coding", [
      "Default_No_Compression",
      "Unicode_No_Compression",
      "8bit",
      "Default_Compression",
      "Unicode_Compression",
    ])
      .default("Default_No_Compression")
      .notNull(),
    udh: text("UDH").notNull(),
    smscNumber: varchar("SMSCNumber", { length: 20 }).notNull(),
    class: int("Class").default(-1).notNull(),
    textDecoded: text("TextDecoded").notNull(),
    id: int("ID").default(0).notNull(),
    senderId: varchar("SenderID", { length: 255 }).notNull(),
    sequencePosition: int("SequencePosition").default(1).notNull(),
    status: mysqlEnum("Status", [
      "SendingOK",
      "SendingOKNoReport",
      "SendingError",
      "DeliveryOK",
      "DeliveryFailed",
      "DeliveryPending",
      "DeliveryUnknown",
      "Error",
    ])
      .default("SendingOK")
      .notNull(),
    statusError: int("StatusError").default(-1).notNull(),
    tpmr: int("TPMR").default(-1).notNull(),
    relativeValidity: int("RelativeValidity").default(-1).notNull(),
    creatorId: text("CreatorID").notNull(),
  },
  (table) => {
    return {
      date: index("sentitems_date").on(table.deliveryDateTime),
      tpmr: index("sentitems_tpmr").on(table.tpmr),
      dest: index("sentitems_dest").on(table.destinationNumber),
      sender: index("sentitems_sender").on(table.senderId),
    };
  }
);

export const serial = mysqlTable(
  "serial",
  {
    serialId: int("serial_id").autoincrement().notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    dateStart: date("date_start", { mode: "string" }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    dateEnd: date("date_end", { mode: "string" }).default("NULL"),
    period: varchar("period", { length: 100 }).default("NULL"),
    notes: text("notes").default("NULL"),
    biblioId: int("biblio_id"),
    gmdId: int("gmd_id"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      fkSerialBiblio: index("fk_serial_biblio").on(table.biblioId),
      fkSerialGmd: index("fk_serial_gmd").on(table.gmdId),
    };
  }
);

export const setting = mysqlTable(
  "setting",
  {
    settingId: int("setting_id").autoincrement().notNull(),
    settingName: varchar("setting_name", { length: 30 }).notNull(),
    settingValue: text("setting_value").default("NULL"),
  },
  (table) => {
    return {
      settingName: unique("setting_name").on(table.settingName),
    };
  }
);

export const stockTake = mysqlTable("stock_take", {
  stockTakeId: int("stock_take_id").autoincrement().notNull(),
  stockTakeName: varchar("stock_take_name", { length: 200 }).notNull(),
  startDate: datetime("start_date", { mode: "string" }).notNull(),
  endDate: datetime("end_date", { mode: "string" }).default("NULL"),
  initUser: varchar("init_user", { length: 50 }).notNull(),
  totalItemStockTaked: int("total_item_stock_taked"),
  totalItemLost: int("total_item_lost"),
  totalItemExists: int("total_item_exists").default(0),
  totalItemLoan: int("total_item_loan"),
  stockTakeUsers: mediumtext("stock_take_users").default("NULL"),
  isActive: int("is_active").default(0).notNull(),
  reportFile: varchar("report_file", { length: 255 }).default("NULL"),
});

export const stockTakeItem = mysqlTable(
  "stock_take_item",
  {
    stockTakeId: int("stock_take_id").notNull(),
    itemId: int("item_id").notNull(),
    itemCode: varchar("item_code", { length: 20 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    gmdName: varchar("gmd_name", { length: 30 }).default("NULL"),
    classification: varchar("classification", { length: 30 }).default("NULL"),
    collTypeName: varchar("coll_type_name", { length: 30 }).default("NULL"),
    callNumber: varchar("call_number", { length: 50 }).default("NULL"),
    location: varchar("location", { length: 100 }).default("NULL"),
    status: mysqlEnum("status", ["e", "m", "u", "l"]).default("m").notNull(),
    checkedBy: varchar("checked_by", { length: 50 }).default("NULL"),
    lastUpdate: datetime("last_update", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      status: index("status").on(table.status),
      itemPropertiesIdx: index("item_properties_idx").on(
        table.gmdName,
        table.classification,
        table.collTypeName,
        table.location
      ),
      itemCode: unique("item_code").on(table.itemCode),
    };
  }
);

export const systemLog = mysqlTable(
  "system_log",
  {
    logId: int("log_id").autoincrement().notNull(),
    logType: mysqlEnum("log_type", ["staff", "member", "system"])
      .default("staff")
      .notNull(),
    id: varchar("id", { length: 50 }).default("NULL"),
    logLocation: varchar("log_location", { length: 50 }).notNull(),
    subModule: varchar("sub_module", { length: 50 }).default("NULL"),
    action: varchar("action", { length: 50 }).default("NULL"),
    logMsg: text("log_msg").notNull(),
    logDate: datetime("log_date", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      logType: index("log_type").on(table.logType),
      id: index("id").on(table.id),
    };
  }
);

export const user = mysqlTable(
  "user",
  {
    userId: int("user_id").autoincrement().notNull(),
    username: varchar("username", { length: 50 }).notNull(),
    realname: varchar("realname", { length: 100 }).notNull(),
    passwd: varchar("passwd", { length: 64 }).notNull(),
    we2Fa: text("2fa").default("NULL"),
    email: varchar("email", { length: 200 }).default("NULL"),
    userType: smallint("user_type"),
    userImage: varchar("user_image", { length: 250 }).default("person.png"),
    socialMedia: text("social_media").default("NULL"),
    lastLogin: datetime("last_login", { mode: "string" }).default("NULL"),
    lastLoginIp: char("last_login_ip", { length: 15 }).default("NULL"),
    groups: varchar("groups", { length: 200 }).default("NULL"),
    nodeIds: text("node_ids").default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).default("NULL"),
    forgot: varchar("forgot", { length: 80 }).default("NULL"),
    adminTemplate: text("admin_template").default("NULL"),
    nodeId: int("node_id").notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).default("NULL"),
    showOnProfile: mysqlEnum("show_on_profile", ["1", "0"]).default("1"),
  },
  (table) => {
    return {
      realname: index("realname").on(table.realname),
      username: unique("username").on(table.username),
    };
  }
);

export const userGroup = mysqlTable(
  "user_group",
  {
    groupId: int("group_id").autoincrement().notNull(),
    groupName: varchar("group_name", { length: 30 }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inputDate: date("input_date", { mode: "string" }).default("NULL"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    lastUpdate: date("last_update", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      groupName: unique("group_name").on(table.groupName),
    };
  }
);

export const vAllMember = mysqlTable("vAllMember", {
  memberId: varchar("member_id", { length: 20 }).default("").notNull(),
  memberName: varchar("member_name", { length: 100 }).default("").notNull(),
  gender: int("gender").default(0).notNull(),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  birthDate: date("birth_date", { mode: "string" }).default("NULL"),
  memberTypeId: int("member_type_id"),
  memberAddress: varchar("member_address", { length: 255 }).default("NULL"),
  memberMailAddress: varchar("member_mail_address", { length: 255 }).default(
    "NULL"
  ),
  memberEmail: varchar("member_email", { length: 100 }).default("NULL"),
  postalCode: varchar("postal_code", { length: 20 }).default("NULL"),
  instName: varchar("inst_name", { length: 100 }).default("NULL"),
  isNew: int("is_new"),
  memberImage: varchar("member_image", { length: 200 }).default("NULL"),
  pin: varchar("pin", { length: 50 }).default("NULL"),
  memberPhone: varchar("member_phone", { length: 50 }).default("NULL"),
  memberFax: varchar("member_fax", { length: 50 }).default("NULL"),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  memberSinceDate: date("member_since_date", { mode: "string" }).default(
    "NULL"
  ),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  registerDate: date("register_date", { mode: "string" }).default("NULL"),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  expireDate: date("expire_date", { mode: "string" })
    .default("0000-00-00")
    .notNull(),
  memberNotes: mediumtext("member_notes").default("NULL"),
  isPending: smallint("is_pending").notNull(),
  mpasswd: varchar("mpasswd", { length: 64 }).default("NULL"),
  lastLogin: datetime("last_login", { mode: "string" }).default("NULL"),
  lastLoginIp: varchar("last_login_ip", { length: 20 }).default("NULL"),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  inputDate: date("input_date", { mode: "string" }).default("NULL"),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  lastUpdate: date("last_update", { mode: "string" }).default("NULL"),
  tabel: varchar("tabel", { length: 2 }).default("").notNull(),
});

export const vBiblioRequisitions = mysqlTable("vBiblio_Requisitions", {
  biblioRequisitionId: int("biblio_requisition_id").default(0).notNull(),
  memberId: varchar("member_id", { length: 20 }).default("").notNull(),
  memberName: varchar("member_name", { length: 100 }).default("").notNull(),
  isbn: varchar("isbn", { length: 13 }).default("NULL"),
  title: mediumtext("title").default("").notNull(),
  author: varchar("author", { length: 100 }).default("").notNull(),
  publisher: varchar("publisher", { length: 100 }).default("").notNull(),
  publishYear: varchar("publish_year", { length: 4 }).default("NULL"),
  description: mediumtext("description").default("").notNull(),
  priceCurrency: varchar("price_currency", { length: 3 }).default("NULL"),
  priceInDollar: int("price_in_dollar"),
  priceInRupiah: int("price_in_rupiah"),
  type: varchar("type", { length: 5 }).default("NULL"),
  information: mediumtext("information").default("").notNull(),
  flag: varchar("flag", { length: 11 }).default("NULL"),
  insertDate: datetime("insert_date", { mode: "string" }).default("NULL"),
  lastUpdate: datetime("last_update", { mode: "string" }).default("NULL"),
  nodeId: varchar("node_id", { length: 2 }).default("").notNull(),
});

export const visitorCount = mysqlTable(
  "visitor_count",
  {
    visitorId: int("visitor_id").autoincrement().notNull(),
    memberId: varchar("member_id", { length: 20 }).default("NULL"),
    memberName: varchar("member_name", { length: 255 }).notNull(),
    institution: varchar("institution", { length: 100 }).default("NULL"),
    locationId: varchar("location_id", { length: 3 }).default("NULL"),
    roomCode: varchar("room_code", { length: 5 }).default("NULL"),
    checkinDate: datetime("checkin_date", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      memberId: index("member_id").on(table.memberId),
      roomCode: index("room_code").on(table.roomCode),
    };
  }
);

export const vSearchBiblioAll = mysqlTable("vSearch_Biblio_All", {
  mstBiblioId: varchar("mst_biblio_id", { length: 0 }).default("").notNull(),
  fakultasHukum: varchar("Fakultas Hukum", { length: 45 })
    .default("")
    .notNull(),
  biblioId: int("biblio_id").default(0).notNull(),
  title: mediumtext("title").default("NULL"),
  edition: varchar("edition", { length: 50 }).default("NULL"),
  isbnIssn: varchar("isbn_issn", { length: 20 }).default("NULL"),
  author: longtext("author").default("NULL"),
  topic: longtext("topic").default("NULL"),
  gmd: varchar("gmd", { length: 30 }).default("NULL"),
  publisher: varchar("publisher", { length: 100 }).default("NULL"),
  publishPlace: varchar("publish_place", { length: 30 }).default("NULL"),
  language: varchar("language", { length: 20 }).default("NULL"),
  classification: varchar("classification", { length: 40 }).default("NULL"),
  specDetailInfo: mediumtext("spec_detail_info").default("NULL"),
  carrierType: varchar("carrier_type", { length: 100 }).default("NULL"),
  contentType: varchar("content_type", { length: 100 }).default("NULL"),
  mediaType: varchar("media_type", { length: 100 }).default("NULL"),
  location: longtext("location").default("NULL"),
  publishYear: varchar("publish_year", { length: 20 }).default("NULL"),
  notes: mediumtext("notes").default("NULL"),
  seriesTitle: mediumtext("series_title").default("NULL"),
  items: longtext("items").default("NULL"),
  collectionTypes: longtext("collection_types").default("NULL"),
  callNumber: varchar("call_number", { length: 50 }).default("NULL"),
  opacHide: smallint("opac_hide"),
  promoted: smallint("promoted"),
  labels: mediumtext("labels").default("NULL"),
  collation: varchar("collation", { length: 255 }).default("NULL"),
  image: varchar("image", { length: 100 }).default("NULL"),
  inputDate: datetime("input_date", { mode: "string" }).default("NULL"),
  lastUpdate: datetime("last_update", { mode: "string" }).default("NULL"),
});

export const vSumBiblioAll = mysqlTable("vSumBiblioAll", {
  totalKoleksiTercatat: decimal("TotalKoleksiTercatat", {
    precision: 42,
    scale: 0,
  }).default("NULL"),
});

export const vSumMst = mysqlTable("vSumMst", {
  node: varchar("Node", { length: 2 }).default("").notNull(),
  nodeName: varchar("NodeName", { length: 255 }).default("NULL"),
  jmlBiblio: bigint("JmlBiblio", { mode: "number" }).notNull(),
  jmlSrcBiblio: bigint("JmlSrcBiblio", { mode: "number" }),
  jmlMstSrcBiblio: bigint("JmlMstSrcBiblio", { mode: "number" }).notNull(),
});

export const vSumMstSrcBiblio = mysqlTable("vSumMstSrcBiblio", {
  node: varchar("Node", { length: 255 }).default("NULL"),
  jmlMstSrcBiblio: bigint("JmlMstSrcBiblio", { mode: "number" }).notNull(),
});

export const vSumPerNode = mysqlTable("vSumPerNode", {
  node: varchar("Node", { length: 2 }).default("").notNull(),
  nodeName: varchar("NodeName", { length: 255 }).default("NULL"),
  jmlBiblio: bigint("JmlBiblio", { mode: "number" }).notNull(),
  jmlSrcBiblio: bigint("JmlSrcBiblio", { mode: "number" }),
});

export const vUnionSumBiblio = mysqlTable("vUnionSumBiblio", {
  node: varchar("Node", { length: 2 }).default("").notNull(),
  jmlBiblio: bigint("JmlBiblio", { mode: "number" }).notNull(),
});

export const vUnionSumSrcBiblio = mysqlTable("vUnionSumSrcBiblio", {
  node: varchar("Node", { length: 2 }).default("").notNull(),
  jmlSrcBiblio: bigint("JmlSrcBiblio", { mode: "number" }).notNull(),
});
